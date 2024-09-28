'use client'
import * as React from 'react';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import signUp from "@/firebase/(auth)/signup";
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import AlertStatus from '@/components/AlertStatus';
import Image from "next/image";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from '@mui/joy/styles';
import theme from "@/theme";
import { CssBaseline, FormHelperText } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import { checkEmailExists, checkUsernameExists } from "@/services/UserService";
import { FirebaseError } from '@firebase/util'

const debounce = (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const router = useRouter();

    // Handle form submission
    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Attempt to sign up with provided email, password, first name, and last name
        const { result, error } = await signUp(email, password, firstName, lastName, username);

        // Check if username contains a dot
        if (username.includes('.')) {
            setUsernameError('Username cannot contain a dot (.)');
            return;
        }

        if (error instanceof FirebaseError) {
            // Display and log any sign-up errors
            console.log(error);
            setError(error.message);
            if (error.code === 'auth/weak-password')
                setAlert({ show: true, success: false, message: 'Password should have at least 6 characters.' });
            if (error.code === 'auth/invalid-email')
                setAlert({ show: true, success: false, message: 'Please use a valid email address.' }); 
            if (error.code === 'auth/email-already-in-use')
                setAlert({ show: true, success: false, message: 'Account with email already exists.' });
            if (error.code === 'auth/username-already-exists')
                setAlert({ show: true, success: false, message: 'Username is already taken.' });
            return;
        }

        // Sign up successful
        console.log(result);
        setAlert({ show: true, success: true, message: 'Sign up successful!' });

        // Redirect to the home page
        router.push("/home");
    }

    const checkUsername = useCallback(debounce(async (username: string) => {
        if (!username) return;
        try {
            const check = await checkUsernameExists(username)
            check
                ? setUsernameError("Username is already taken.")
                : setUsernameError('');
        } catch (error) {
            console.error("Error checking username:", error);
        }
    }, 500), []);

    useEffect(() => {
        checkUsername(username);
    }, [username, checkUsername]);

    const checkEmail = useCallback(debounce(async (email: string) => {
        if (!email) return;
        try {
            const check = await checkEmailExists(email)
            check
                ? setEmailError("Account with email already made.")
                : setEmailError('');
        } catch (error) {
            console.error("Error checking email:", error);
        }
    }, 500), []);

    useEffect(() => {
        checkEmail(email);
    }, [email, checkEmail]);

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
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
                            priority
                        />
                    </Link>

                    <Typography level="h3" marginTop={3}>
                        Sign Up
                    </Typography>

                    <Typography level="body-xs">
                        Note: You cannot change your username/email after signing up.
                    </Typography>

                    {(error || alert) && <
                        Box sx={{ mt: 2, width: 1 }}>
                        {alert.show && <AlertStatus success={alert.success} message={alert.message} />}
                    </Box>
                    }

                    <Box component="form" onSubmit={handleForm}>
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <Input
                                    placeholder="First Name"
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    id="firstName"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <Input
                                    placeholder="Last Name"
                                    required
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>

                            <Grid xs={12}>
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        required
                                        fullWidth
                                        id="username"
                                        name="username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        error={usernameError != ""}
                                    />
                                    <FormHelperText>
                                        {usernameError}
                                    </FormHelperText>
                                </FormControl>

                            </Grid>

                            <Grid xs={12}>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={emailError != ''}
                                    />
                                    <FormHelperText>
                                        {emailError}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid xs={12}>
                                <Input
                                    placeholder="Password"
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <div className="grid text-center gap-5 lg:text-center mt-5 mb-5">
                            <Button type="submit"
                                disabled={usernameError !== '' || emailError !== ''}>
                                Sign up
                            </Button>
                        </div>
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Link href="/signin" level="body-sm">
                                    <Typography level="body-sm" color="primary">
                                        Already have an account?
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </CssVarsProvider>
    );
}

export default Page;
