"use client"

import {CssBaseline} from "@mui/joy";
import * as React from "react";
import theme from "@/theme";
import {CssVarsProvider} from "@mui/joy/styles";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {checkRelationship, retrieveUserFromUsername} from "@/services/UserService";
import {User} from "@/types/user";
import {useEffect, useState} from "react";
import Profile from "@/features/profiles/Profile";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import AddFriendButton from "@/features/profiles/AddFriendButton";

export default function Page({ params }: { params: { user: string } }) {
    const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [relationship, setRelationship] = useState<string>("None");

    useEffect(() => {
        if (user == null) {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await retrieveUserFromUsername(params.user);
            setCurrentUser(fetchedUser);
            // Once user is fetched, get initial relationship status
            if (fetchedUser) {
                const initialRelationship = await checkRelationship(user.email, fetchedUser.email);
                setRelationship(initialRelationship);
            }
        };
        getUser();
    }, [params.user, user.email]);

    const handleRelationshipChange = async () => {
        if (currentUser) {
            const updatedRelationship = await checkRelationship(user.email, currentUser.email);
            setRelationship(updatedRelationship);
        }
    };

    if (!currentUser) {
        return (
            <div>
                <CssVarsProvider theme={theme}>
                    <CssBaseline />
                    <Box sx={{ display: 'flex' }}>
                        <Header />
                        <NavigationBar />
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
                        >
                            <Typography>
                                User does not exist.
                            </Typography>
                        </Box>
                    </Box>
                </CssVarsProvider>
            </div>
        );
    }

    return (
        <div>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ display: 'flex' }}>
                    <Header />
                    <NavigationBar />
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
                    >
                        <Typography level="title-sm" paddingBottom={1} >
                            Friend status:
                        </Typography>
                        <AddFriendButton
                            currentUser={user.email}
                            otherUser={currentUser.email}
                            relationship={relationship}
                            onRelationshipChange={handleRelationshipChange} // Pass callback function
                        />
                        <Profile user={currentUser} />
                    </Box>
                </Box>
            </CssVarsProvider>
        </div>
    );
}