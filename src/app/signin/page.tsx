'use client'

import signIn from "@/firebase/(auth)/signIn";
import {useRouter} from 'next/navigation';
import {useState} from "react";
import AlertStatus from "@/components/AlertStatus";
import * as React from 'react';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Container from '@mui/material/Container';
import Input from "@mui/joy/Input";
import Image from "next/image";
import Button from "@mui/joy/Button";
import {CssVarsProvider} from '@mui/joy/styles';
import theme from "@/theme";
import Stack from "@mui/joy/Stack";
import {CssBaseline} from "@mui/joy";
import { FirebaseError } from '@firebase/util'

function Page(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const router = useRouter();

    // Handle form submission
    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // Attempt to sign in with provided email and password
        const {result, error} = await signIn(email, password);

        if (error instanceof FirebaseError) {
            // Display and log any sign-in errors
            console.log(error);
            setError(error.message);
            if (error.code === 'auth/invalid-email')
                setAlert({ show: true, success: false, message: 'Please use a valid email address.' });
            if (error.code === 'auth/wrong-password')
                setAlert({ show: true, success: false, message: 'Incorrect password.' });
            if (error.code === 'auth/user-not-found')
                setAlert({ show: true, success: false, message: 'User not found.' });
            if (error.code === 'auth/missing-password')
                setAlert({ show: true, success: false, message: 'Please enter a password.' });
            if (error.code === 'auth/invalid-credential')
                setAlert({ show: true, success: false, message: 'Invalid credential.' });
            // setAlert({show: true, success: false, message: 'Sign in unsuccessful'});
            return;
        }

        // Sign in successful
        console.log(result);
        setAlert({show: true, success: true, message: 'Sign in successful!'});

        // Redirect to the admin page
        // Typically you would want to redirect them to a protected page an add a check to see if they are admin or
        // create a new page for admin
        router.push("/home");
    }

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline/>
            <Container component="main" maxWidth="xs">


                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={350}
                            height={150}
                        />
                    </Link>

                    <Typography level="h3" marginTop={3}>
                        Login
                    </Typography>

                    {(error || alert) && (
                        <Box sx={{mt: 2, width: "80%"}}>
                            {alert.show && <AlertStatus success={alert.success} message={alert.message} />}
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleForm} noValidate width="80%">
                        <Input
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                        />
                        <Input
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            sx={{mt: 2}}
                        />

                        <div className="grid text-center gap-5 lg:text-center mt-5 mb-5">
                            {/* Use type="submit" to submit the form */}
                            <Button type="submit">
                                Sign In
                            </Button>
                        </div>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            spacing={1}
                        >
                            <Link href="#"
                                  level="body-sm">
                                Forgot password?
                            </Link>
                            <Link href="/signup"
                                  level="body-sm">
                                {"Sign up"}
                            </Link>
                        </Stack>

                    </Box>
                </Box>

            </Container>
        </CssVarsProvider>
    );
}

export default Page;
