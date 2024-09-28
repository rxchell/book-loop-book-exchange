"use client";

import React from 'react';
import { Sheet, IconButton, Typography, Button } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { CssVarsProvider, CssBaseline, Modal } from '@mui/joy';
import { User } from '@/types/user';
import { createNewChat } from '@/services/ChatService';
import theme from '@/theme';
import AlertStatus from '@/components/AlertStatus';
import { ChatToExchangeProps } from '@/types/chats';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side navigation

const ChatToExchange: React.FC<ChatToExchangeProps> = ({ user, open, onClose, setSelectedChat, owner }) => {
    const [alert, setAlert] = React.useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const router = useRouter(); // useRouter hook to navigate

    const handleNewChat = async () => {
        try {
            const createdChat = await createNewChat(user.email, owner.email); 
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
                            New chat with {user.username} {/* Display the owner's username */}
                        </Typography>

                        <Typography component="p" textColor="inherit" mt={2} mb={2}>
                            Would you like to start a chat with {user.username} about exchanging books?
                        </Typography>

                        <Button type="button" onClick={handleNewChat}>
                            Start chatting
                        </Button>
                        {alert.show && (
                            <AlertStatus success={alert.success} message={alert.message} />
                        )}
                    </Sheet>
                </Modal>
            </CssVarsProvider>
        </React.Fragment>
    );
};

export default ChatToExchange;
