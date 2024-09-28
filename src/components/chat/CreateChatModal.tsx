import * as React from 'react';
import { Sheet, IconButton, Typography, Stack, FormControl, Select, Option } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { CssVarsProvider, CssBaseline, Modal } from '@mui/joy';
import { User } from '@/types/user';
import { createNewChat } from '@/services/ChatService';
import { ChatProps, CreateChatProps } from '@/types/chats';
import Conversation from './Conversation';
import { Button } from '@mui/joy'; 
import AlertStatus from '@/components/AlertStatus'; 
import { useRouter } from 'next/navigation';
import theme from '@/theme'; 
import {getAllUsers} from "@/services/UserService";

const CreateChat: React.FC<CreateChatProps> = ({ user, open, onClose, setSelectedChat }) => {
    const [friendName, setFriendName] = React.useState<string>(''); 
    const [friends, setFriends] = React.useState<User[]>([]); // State to hold list of friends
    const [newChat, setNewChat] = React.useState<ChatProps | undefined>(undefined); 
    const [alert, setAlert] = React.useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const router = useRouter(); // useRouter hook to navigate

    const handleSelectFriend = (value: string | null) => {
        setFriendName(value || '');
    };

    React.useEffect(() => {
        const fetchUserFriends = async () => {
            try {
                const fetchedFriends = await getAllUsers();
                setFriends(fetchedFriends);
            } catch (error) {
                console.error('Error fetching user friends:', error);
            }
        };

        if (open) {
            fetchUserFriends();
        }
    }, [open, user.email]);

    const selectedFriend = friends.find((friend) => friend.username === friendName);

    const handleNewChat = async () => {
        try {
            if (!selectedFriend) {
                console.error('Selected friend not found.');
                return;
            }

            const createdChat = await createNewChat(user.email, selectedFriend.email);
            setNewChat(createdChat); // Set the newly created chat
            setSelectedChat(createdChat); // Update selected chat
            onClose(); // Close modal after chat creation
            setAlert({ show: true, success: true, message: 'Chat created successfully!' });

            // Redirect back to messages page
            router.push(`/messages`);
        } catch (error) {
            console.error('Error starting new chat, Create Chat Modal:', error);
            setAlert({ show: true, success: false, message: 'Chat already exists' });
        }
    };

    return (
        <React.Fragment>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <Modal
                    aria-labelledby="create-chat-modal"
                    open={open}
                    onClose={onClose}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            minWidth: 300,
                            borderRadius: 'md',
                            p: 3,
                        }}
                    >
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            component="h2"
                            id="create-chat-modal"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                        >
                            New chat
                        </Typography>

                        <Typography component="p" textColor="inherit" mt={2} mb={2}>
                            Select a friend to chat with.
                        </Typography>

                        <Stack spacing={2}>
                            <FormControl>
                                <Select
                                    value={friendName}
                                    onChange={(e, newValue) => handleSelectFriend(newValue)}
                                >
                                    {friends.map((friend, index) => (
                                        <Option key={index} value={friend.username}>
                                            {friend.username}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedFriend && (
                                <>
                                    <Button type="button" onClick={handleNewChat}>
                                        Start chatting
                                    </Button>
                                    {alert.show && (
                                        <AlertStatus success={alert.success} message={alert.message} />
                                    )}
                                </>
                            )}
                        </Stack>
                    </Sheet>
                </Modal>
            </CssVarsProvider>

            {/* Render Conversation if newChat is defined */}
            {newChat && <Conversation chat={newChat} />}
        </React.Fragment>
    );
};

export default CreateChat;
