'use client'
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import NavigationBar from "@/components/sidebar/NavigationBar";
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy";
import theme from "@/theme";

function Page(): JSX.Element {
  // Access the user object from the authentication context
  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  useEffect( () => {
    // Redirect to the home page if the user is not logged in
    if ( user == null ) {
      router.push( "/" );
    }
    // }, [ user ] );
  }, [ user, router ] ); // Include 'router' in the dependency array to resolve eslint warning

  return (
    <CssVarsProvider theme={theme}>
      <Box component="main" sx={{ display: 'flex' }}>
        <Header />
        <NavigationBar />
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
            <Typography level="h1" marginTop={10} marginLeft={1}>
            Social
            </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default Page;
