import React from 'react';
import { Sheet, IconButton, Typography, Stack, Box, Chip, Input, List } from '@mui/joy';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CssVarsProvider, CssBaseline } from '@mui/joy';
import { toggleChatsPane } from '@/utils/messages';
import { useAuthContext } from '@/context/AuthContext';
import ChatList from './ChatList';
import CreateChat from './CreateChatModal';
import { User } from '@/types/user';
import theme from '@/theme';
import { ChatProps } from '@/types/chats';
import { retrieveAllReceivers, getTotalUnreadMessages } from '@/services/ChatService';
import { useEffect, useCallback } from 'react';

type AllChatsProps = {
    chatIDs: string[];
    setSelectedChat: (chat: ChatProps) => void;
    selectedChatId: string;
};

const AllChats: React.FC<AllChatsProps> = ({ chatIDs = [], setSelectedChat, selectedChatId }) => {
    const { user } = useAuthContext() as { user: User };
    const [openCreateChat, setOpenCreateChat] = React.useState<boolean>(false);

    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [filteredChatIDs, setFilteredChatIDs] = React.useState<string[]>(chatIDs);
    const [receivers, setReceivers] = React.useState<string[]>([]);

    const handleCloseCreateChat = () => {
        setOpenCreateChat(false);
    };

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredChatIDs(chatIDs);
        } else {
            setFilteredChatIDs(
                chatIDs.filter((chatId, index) => receivers[index]?.toLowerCase().includes(query))
            );
        }
    }, [chatIDs, receivers]);

    useEffect(() => {
        const fetchReceivers = async () => {
            const receiversList = await retrieveAllReceivers(user.email);
            setReceivers(receiversList);
        };
        fetchReceivers();
    }, [user.email, chatIDs]);

    const [chatNumber, setChatNumber] = React.useState<number>(0);
    const fetchChatNumber = async () => {
        try {
        const fetchedChatNumber = await getTotalUnreadMessages(user.email);
        setChatNumber(fetchedChatNumber);
        } catch (error) {
        console.error('Error fetching user chats:', error);
        }
    }

    useEffect(() => {
        if (user && user.email) {
        fetchChatNumber();
        }
    }, [user]);

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <Sheet
                sx={{
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    height: 'calc(100dvh - var(--Header-height))',
                    overflowY: 'auto',
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    pb={2}
                >
                    <Typography
                        level="h3"
                        component="h1"
                        color="primary"
                        endDecorator={
                            chatIDs.length > 0 && (
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    size="md"
                                    slotProps={{ root: { component: 'span' } }}
                                >
                                    {chatNumber}
                                </Chip>
                            )
                        }
                        sx={{ mt: 1, mr: 'auto' }}
                    >
                        Messages
                    </Typography>

                    <IconButton
                        variant="plain"
                        aria-label="create-chat"
                        color="neutral"
                        size="sm"
                        sx={{ display: { xs: 'none', sm: 'unset' } }}
                        onClick={() => setOpenCreateChat(true)}
                    >
                        <CreateRoundedIcon />
                    </IconButton>

                    <IconButton
                        variant="plain"
                        aria-label="close"
                        color="neutral"
                        size="sm"
                        onClick={() => {
                            toggleChatsPane();
                        }}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>

                <Box sx={{ px: 2, pb: 1.5 }}>
                    <Input
                        size="sm"
                        startDecorator={<SearchRoundedIcon />}
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>

                <List
                    sx={{
                        py: 0,
                        '--ListItem-paddingY': '0.75rem',
                        '--ListItem-paddingX': '1rem',
                    }}
                >
                    {filteredChatIDs.length > 0 ? (
                        filteredChatIDs.map((chat) => (
                            <ChatList
                                key={chat}
                                chatId={chat}
                                selectedChatId={selectedChatId}
                                setSelectedChat={setSelectedChat}
                            />
                        ))
                    ) : (
                        <Typography
                            level="title-sm"
                            sx={{ textAlign: 'center', p: 2, color: 'text.secondary' }}
                        >
                            No chats available
                        </Typography>
                    )}
                </List>
            </Sheet>

            {/* CreateChat modal */}
            <CreateChat
                open={openCreateChat}
                onClose={handleCloseCreateChat}
                user={user}
                setSelectedChat={setSelectedChat}
            />
        </CssVarsProvider>
    );
};

export default AllChats;