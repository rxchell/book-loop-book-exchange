'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Sheet } from '@mui/joy';
import Header from '@/components/Header';
import NavigationBar from '@/components/sidebar/NavigationBar';
import AllChats from '@/components/chat/AllChats';
import { ChatProps } from '@/types/chats';
import { useAuthContext } from '@/context/AuthContext';
import Conversation from '@/components/chat/Conversation';
import { User } from '@/types/user';

function Page(): JSX.Element {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<ChatProps | undefined>(undefined);
  const { user, refreshUser } = useAuthContext() as { user: User; refreshUser: (email: string) => Promise<void> };

  useEffect(() => {
    if (user == null) {
      router.push('/');
    }
  }, [user, router]);

  // Convert user.chats (Record<string, ChatProps>) to an array of chatIDs
  const chatsArray = user?.chats ? Object.values(user.chats) : [];

  return (
    <Box component="main" sx={{ display: 'flex' }}>
      <Header />
      <NavigationBar />

      <Sheet
        sx={{
          flex: 1,
          width: '100%',
          mx: 'auto',
          pt: { xs: 'var(--Header-height)', sm: 0 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(min-content, min(30%, 400px)) 1fr',
          },
        }}
      >
        <Sheet
          sx={{
            position: { xs: 'fixed', sm: 'sticky' },
            transform: {
              xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
              sm: 'none',
            },
            transition: 'transform 0.4s, width 0.4s',
            zIndex: 100,
            width: '100%',
            top: 52,
          }}
        >
          <AllChats
            chatIDs={chatsArray}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChat?.chatId || ''}
          />
        </Sheet>

        {/* Render Conversation based on selectedChat */}
        {selectedChat && (
          <Sheet>
            <Conversation chat={selectedChat} />
          </Sheet>
        )}
      </Sheet>
    </Box>
  );
}

export default Page;