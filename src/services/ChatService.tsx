import firebase_app from "@/firebase/config";
import { arrayUnion, doc, setDoc, getDoc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { ChatProps, MessageProps } from "@/types/chats";
import { v4 as uuidv4 } from 'uuid';
import { refreshUser } from "./UserService";
import { retrieveUser } from "./UserService";

const db = getFirestore(firebase_app);

function generateChatId(): string {
    return uuidv4(); // Generate a random UUID v4
}

export async function retrieveChats(userEmail: string): Promise<ChatProps[]> {
    try {
        const userDoc = await getDoc(doc(db, "users", userEmail as string));

        if (!userDoc.exists()) {
            throw new Error("User record not found");
        }

        const chatIds = userDoc.data()?.chats as string[];

        if (!chatIds) {
            return [];
        }

        const chats: ChatProps[] = [];

        for (const chatId of chatIds) {
            const chatRecord = await getDoc(doc(db, "chats", chatId));
            if (chatRecord.exists()) {
                chats.push(chatRecord.data() as ChatProps);
            }
        }

        return chats;
    } catch (error) {
        console.error("Error retrieving chats:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function retrieveAllReceivers(userEmail: string): Promise<string[]> {
    try {
        const chats = await retrieveChats(userEmail);
        const receivers = chats.map(chat => chat.receiver);
        const receiversUsernames = await Promise.all(receivers.map(async (receiver) => {
            const user = await retrieveUser(receiver);
            return user.username;
        }
        ));
        return receiversUsernames;
    } catch (error) {
        console.error("Error retrieving all receivers:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function getChatsLength(userEmail: string): Promise<number> {
    try {
      const chats = await retrieveChats(userEmail);
      return chats.length;
    } catch (error) {
      console.error('Error getting chats length:', error);
      throw error; // Rethrow the error for handling in the UI or caller function
    }
}

async function chatExists(sender: string, receiver: string): Promise<boolean> {
    try {
        const senderChats = await retrieveChats(sender);
        const receiverChats = await retrieveChats(receiver);

        for (const chat of senderChats) {
            if (receiverChats.some((rc) => rc.chatId === chat.chatId)) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error("Error checking if chat exists:", error);
        throw error;
    }
}

export async function createNewChat(sender: string, receiver: string): Promise<ChatProps> {
    try {
        // Check if chat already exists
        const existingChat = await chatExists(sender, receiver);
        if (existingChat) {
            throw new Error("Chat between these users already exists");
        }

        const chatId = generateChatId();
        const newChat: ChatProps = {
            chatId,
            sender: sender,
            receiver: receiver,
            messages: []
        };

        // Create the chat document in Firestore
        await setDoc(doc(db, "chats", chatId), newChat);

        // Update both users' chat records 
        await updateChatRecords(sender, chatId);
        await updateChatRecords(receiver, chatId);

        // Refresh users
        await refreshUser(sender);
        await refreshUser(receiver);

        return newChat;
    } catch (error) {
        console.error("Chat Service, Error creating new chat:", error);
        throw error;
    }
}

export async function updateChatRecords(userEmail: string, chatId: string) {
    try {
        const docRef = doc(db, "users", userEmail as string);

        // Add the new chat to the array of chats in the user's document
        await updateDoc(docRef, {
            chats: arrayUnion(chatId),
        });
    } catch (error) {
        console.error("Error updating chat records:", error);
        throw error;
    }
}

export async function sendMessage(chatId: string, receiver: string, sender: string, message: string) {
    const messageData = {
        id: uuidv4(),
        content: message,
        time: new Date(),
        unread: true,
        sender: sender,
        receiver: receiver,
        messageText: message
    };
    try {
        await updateDoc(doc(db, "chats", chatId as string), {
            messages: arrayUnion(messageData),
        });
    } catch (error) {
        console.error("Error sending message:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function markMessageAsRead(chatId: string, receiver: string) {
    try {
        const chatData = await retrieveChatProps(chatId);
        const updatedMessages = chatData.messages.map(message => 
            message.receiver === receiver ? { ...message, unread: false } : message
        );
        await updateDoc(doc(db, "chats", chatId), {
            messages: updatedMessages,
        });
    } catch (error) {
        console.error("Error marking message as read:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function countUnreadMessages(messages: MessageProps[], receiver: string): Promise<number> {
    return messages.filter(message => message.receiver === receiver && message.unread).length;
}

export async function getTotalUnreadMessages(userEmail: string): Promise<number> {
    try {
      // Retrieve all chats for the user
      const chats = await retrieveChats(userEmail);
  
      // Initialize total unread count
      let totalUnread = 0;
  
      // Iterate through each chat to count unread messages
      for (const chat of chats) {
        const unreadCount = await countUnreadMessages(chat.messages, userEmail);
        totalUnread += unreadCount;
      }
  
      return totalUnread;
    } catch (error) {
      console.error("Error retrieving total unread messages:", error);
      throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function retrieveChat(chatId: string): Promise<ChatProps> {
    try {
        const record = await getDoc(doc(db, "chats", chatId));

        if (!record.exists()) {
            throw new Error("Chat record not found");
        }

        return record.data() as ChatProps;
    } catch (error) {
        console.error("Error retrieving chat:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

export async function retrieveChatProps(chatId: string): Promise<ChatProps> {
    try {
        const record = await getDoc(doc(db, "chats", chatId));

        if (!record.exists()) {
            throw new Error("Chat record not found");
        }

        return record.data() as ChatProps;
    } catch (error) {
        console.error("Error retrieving chat:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

