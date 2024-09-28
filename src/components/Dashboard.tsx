import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Header from './Header';
import NavigationBar from './sidebar/NavigationBar';
import {CssBaseline, CssVarsProvider} from "@mui/joy";
import theme from "@/theme";
import {useAuthContext} from "@/context/AuthContext";
import BookList from "@/components/books/BookList";

const Dashboard: React.FC = () => {

    const {user} = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }


    return (
        <CssVarsProvider theme={theme}>

            <CssBaseline/>

            <Box sx={{display: 'flex'}}>
                <NavigationBar/>
                <Header/>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 5, width: {sm: `calc(100% - 240px)`}}}
                >
                    <Box sx={{p: 3, textAlign:'center'}}>
                        <Typography level="h2">
                            Welcome back {user && user.username} !
                        </Typography>

                        <BookList/>

                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Dashboard;
