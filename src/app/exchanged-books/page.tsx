'use client'
import {useAuthContext} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from '@mui/joy/Box';
import ExchangedBooks from "@/components/books/ExchangedBooks";

function Page(): JSX.Element {
    // Access the user object from the authentication context
    const {user} = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    useEffect(() => {
        // Redirect to the home page if the user is not logged in
        if (user == null) {
            router.push("/");
        }
    }, [user, router]); // Include 'router' in the dependency array to resolve eslint warning

    return (
        <Box sx={{display: 'flex'}}>
            <Header/>
            <NavigationBar/>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - 240px)`}}}
            >
                <ExchangedBooks/>
            </Box>
        </Box>
    );
}

export default Page;