'use client'
import Documentation from "@/features/documentation/Documentation";
import {CssBaseline, CssVarsProvider} from "@mui/joy";
import theme from "@/theme";

import * as React from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from "@mui/joy/Box";

function Page(): JSX.Element {
    // Access the user object from the authentication context
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
                    <Documentation/>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Page;
