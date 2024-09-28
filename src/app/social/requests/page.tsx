"use client"

import theme from "@/theme";
import {CssBaseline} from "@mui/joy";
import * as React from "react";
import {CssVarsProvider} from "@mui/joy/styles";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from "@mui/joy/Box";
import Requests from "@/features/search/components/Requests";
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Typography from "@mui/joy/Typography";

function Page() {

    // Access the user object from the authentication context
    const {user} = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page if the user is not logged in
        if (user == null) {
            router.push("/");
        }
        // }, [ user ] );
    }, [user, router])// Include 'router' in the dependency array to resolve eslint warning


    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{display: 'flex'}}>
                <Header/>
                <NavigationBar/>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - 240px)`}}}
                >
                    <Box sx={{px: {xs: 1, md: 4}}}>
                        <Typography level="h1" component="h1" sx={{mt: 1}}>
                            Friend requests
                        </Typography>
                    </Box>

                    <Requests currentUser={user.email}/>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Page;