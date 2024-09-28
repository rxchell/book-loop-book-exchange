import {User} from "@/types/user";

export interface CreateChatProps {
    user: User;
    open: boolean;
    onClose: () => void;
    setSelectedChat: (chat: ChatProps) => void;
  }

  export interface ChatToExchangeProps {
    user: User;
    open: boolean;
    onClose: () => void;
    setSelectedChat: (chat: ChatProps) => void;
    owner: User;
  }
  
export type MessageProps = {
    id: string;
    content: string;
    time: Date;
    unread: boolean;
    sender: string | "You"; 
    receiver: string | "You";
    messageText: String;
};

export type ChatProps = {
    chatId: string;
    sender: string;
    receiver: string;
    messages: MessageProps[];
};
  