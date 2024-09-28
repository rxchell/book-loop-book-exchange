import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ChattingUser from './ChattingUser';
import { ChatProps, MessageProps } from '@/types/chats';
import { User } from '@/types/user'; 
import { toggleChatsPane } from '@/utils/messages'; 
import { retrieveChatProps, countUnreadMessages as countUnreadMessagesService } from '@/services/ChatService';
import { retrieveUser } from '@/services/UserService';
import { useAuthContext } from '@/context/AuthContext';
import { useEffect } from 'react';

type ChatListProps = ListItemButtonProps & {
  chatId: string;
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatList(props: ChatListProps) {
  const { user } = useAuthContext() as { user: User };

  const { chatId, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === chatId;

  const [chat, setChat] = React.useState<ChatProps>();
  const [sender, setSender] = React.useState<string>('');
  const [receiver, setReceiver] = React.useState<string>('');
  const [receiverUsername, setReceiverUsername] = React.useState<string>('');
  const [chatSender, setChatSender] = React.useState<string>('');
  const [chatReceiver, setChatReceiver] = React.useState<string>('');
  const [messages, setMessages] = React.useState<MessageProps[]>([]);
  const [unread, setUnread] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await retrieveChatProps(chatId);
        setChat(chatData);
        setMessages(chatData.messages);
        setChatSender(chatData.sender);
        setChatReceiver(chatData.receiver);

        let currentReceiver = '';
        if (chatData.sender === user.email) {
          currentReceiver = chatData.receiver;
          setSender(chatData.sender);
        } else if (chatData.receiver === user.email) {
          currentReceiver = chatData.sender;
          setSender(chatData.receiver);
        }
        setReceiver(currentReceiver);

      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    fetchData();
  }, [chatId, user.email]);

  React.useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const receiverData = await retrieveUser(receiver);
        setReceiver(receiverData.email);
        setReceiverUsername(receiverData.username);
      } catch (error) {
        console.error('Error fetching receiver data:', error);
      }
    };

    if (receiver) {
      fetchReceiver();
    }
  }, [receiver]);

  const hasMessages = messages.length > 0;

  const fetchUnread = async () => {
    try {
      const fetchedUnread = await countUnreadMessages(messages, user.email);
      setUnread(fetchedUnread);
      console.log(unread);
    } catch (error) {
      console.error('Error fetching number of unread', error);
    }
  }

  useEffect(() => {
    if (messages && user.email) {
      fetchUnread();
    }
  }, [messages, user, user.email]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleChatsPane();
            setSelectedChat({
              chatId: chatId,
              sender: chatSender,
              receiver: chatReceiver,
              messages: messages,
            });
          }}
          selected={selected}
          color="primary"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <ChattingUser email={receiver} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{receiverUsername}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {unread > 0 && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary">
                  <Typography sx={{ fontSize: 12, color: '#fff' }}>{unread}</Typography>
                </CircleIcon>
              )}
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {hasMessages ? messages[messages.length - 1].content : ''}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}

export async function countUnreadMessages(messages: MessageProps[], receiver: string): Promise<number> {
  return messages.filter(message => message.receiver === receiver && message.unread).length;
}