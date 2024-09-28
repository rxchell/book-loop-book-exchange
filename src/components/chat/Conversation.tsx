import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import ChattingUser from './ChattingUser';
import TextBubble from './TextBubble';
import ChatInput from './ChatInput';
import { ChatProps, MessageProps } from '@/types/chats';
import ConversationDisplay from './ConversationDisplay';
import { useAuthContext } from '@/context/AuthContext';
import { User } from '@/types/user';
import { sendMessage, markMessageAsRead } from '@/services/ChatService';

type ConversationProps = {
  chat?: ChatProps; 
};

export default function Conversation(props: ConversationProps) {
  const { chat } = props;
  const { user } = useAuthContext() as { user: User };
  const [chatMessages, setChatMessages] = React.useState<MessageProps[]>(chat?.messages || []);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textSender, setTextSender] = React.useState<string>('');
  const [textReceiver, setTextReceiver] = React.useState<string>('');
  const [otherUser, setOtherUser] = React.useState<string>('')

  React.useEffect(() => {
    if (chat) {
      setChatMessages(chat.messages || []);
      markMessageAsRead(chat.chatId, user.email);

      chat.receiver === user.email
        ? setOtherUser(chat.sender)
          : setOtherUser(chat.receiver);

      if (chat.receiver && chat.sender) {
        if (chat.receiver === user.email) {  // chat initially started by user's friend to the user 
          setTextSender(user.email);         // user sends the text 
          setTextReceiver(chat.sender);
        }
        if (chat.sender === user.email) {   
          setTextReceiver(user.email);
          setTextSender(chat.sender);       // user sends the text 
        }
      }
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (!chat) return;

    const newId = chatMessages.length + 1;
    const newIdString = newId.toString();
    const newMessage: MessageProps = {
      id: newIdString,
      content: textAreaValue,
      sender: textSender,
      receiver: textReceiver,
      time: new Date(),
      unread: true,
      messageText: textAreaValue,
    };

    // Update local state with new message
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextAreaValue('');
    sendMessage(chat.chatId, textReceiver, textSender, textAreaValue);
  };

  if (!chat) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography level="title-sm" component="h1" sx={{ mt: 1, mb: 2 }}>
          No conversation selected
        </Typography>
      </Box>
    );
  }

  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ConversationDisplay receiver={otherUser} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.length > 0 && chatMessages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === user.email;
            return (
              <Stack
                key={index}
                direction="row"
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                <ChattingUser
                    email={message.sender || ''} 
                />
                <TextBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <ChatInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={handleSendMessage}
      />
    </Sheet>
  );
}
