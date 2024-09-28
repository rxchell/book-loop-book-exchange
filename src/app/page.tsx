'use client'
import Image from "next/image";
import * as React from 'react';
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import {CssVarsProvider} from '@mui/joy/styles';
import theme from "@/theme";
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import {CssBaseline} from "@mui/joy";

export default function LandingPage() {
    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline/>

            <Box className="flex min-h-screen flex-col items-center p-20">

                <Box className="relative z flex place-items-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={400}
                        height={200}
                        priority
                    />
                </Box>

                <Typography level="h3" style={{ paddingTop: '40px' }}>
                    Let's circulate books! 
                </Typography>
                <Typography level="title-md" style={{ paddingTop: '10px' }}>
                    A Peer-to-Peer Book Exchange Platform for anyone and everyone.
                </Typography>
                <br/>

                <Grid container spacing={1} sx={{ paddingTop: '40px', width: '40%'}}>
                    <Grid xs={6}>
                        <Button variant="solid" component={"a"} href="/signin" sx={{width: '100%'}}> Login </Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button variant="solid" component={"a"} href="/signup" sx={{width: '100%'}}> Sign Up </Button>
                    </Grid>
                </Grid>
            </Box>

        </CssVarsProvider>
    );
}
