"use client"

import theme from "@/theme";
import {CssBaseline} from "@mui/joy";
import * as React from "react";
import {CssVarsProvider} from "@mui/joy/styles";
import Search from "@/features/search/components/Search";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

function Page() {
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
                            Search for users
                        </Typography>
                        <Typography sx={{mt: 1}}>
                            Click on a user to send a friend request
                        </Typography>
                    </Box>

                    <Search/>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Page;