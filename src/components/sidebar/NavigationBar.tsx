
import * as React from 'react';
import { useEffect } from 'react';
import Divider from '@mui/joy/Divider';
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Image from 'next/image'; 
import logout from '@/firebase/(auth)/signout';
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import ListItemContent from "@mui/joy/ListItemContent";
import GlobalStyles from '@mui/joy/GlobalStyles';
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import ArticleIcon from '@mui/icons-material/Article';
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LightDarkMode from "./LightDarkMode";
import { closeSidebar } from '@/utils/sidebar';
import {CssBaseline, CssVarsProvider} from '@mui/joy';
import theme from '@/theme';
import {useAuthContext} from "@/context/AuthContext";
import {retrieveFriendRequestsCount} from '@/services/UserService';
import { getTotalUnreadMessages } from '@/services/ChatService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

// Toggle open/close state of navigation bar
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const NavigationBar: React.FC = () => {

  // const currentPath = usePathname();
  const {user} = useAuthContext() as { user: any };
  
  const [friends, setFriends] = React.useState<number>(0);
  const fetchFriendRequests = async () => {
    try {
      const fetchedFriends = await retrieveFriendRequestsCount(user.email);
      setFriends(fetchedFriends);
    } catch (error) {
      console.error('Error fetching user friends:', error);
    }
  };

  const [chatNumber, setChatNumber] = React.useState<number>(0);
  const fetchChatNumber = async () => {
    try {
      const fetchedChatNumber = await getTotalUnreadMessages(user.email);
      setChatNumber(fetchedChatNumber);
    } catch (error) {
      console.error('Error fetching user chats:', error);
    }
  }

  useEffect(() => {
    if (user && user.email) {
      fetchFriendRequests();
      fetchChatNumber();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      // Sign out the user
      await logout();
      // Redirect to the login page
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <CssVarsProvider theme={theme}>
        <CssBaseline />

    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <LightDarkMode sx={{ ml: "auto" }} />
      </Box>

      <List variant="plain">
        <ListItem sx={{ mb: 2 }}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/logo.svg"
            alt="Book Loop Logo"
            width={170}
            height={120}
          />
        </ListItem>

        <Divider />

        <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton variant="plain" component="a" href="/home">
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/list-books">
              <LibraryAddIcon />
              <ListItemContent>
                <Typography level="title-sm">List books</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/my-books">
              <CollectionsBookmarkIcon />
              <ListItemContent>
                <Typography level="title-sm">My listed books</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/favourite-books">
              <FavoriteIcon />
              <ListItemContent>
                <Typography level="title-sm">Favourite books</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/exchanged-books">
              <BookmarkAddedIcon />
              <ListItemContent>
                <Typography level="title-sm">Exchanged books</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton href="/social" onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Social</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton variant="plain" component="a" href="/social/search">User Search</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton variant="plain" component="a" href="/social/requests">
                    Friend Requests
                    <Chip size="sm" color="primary" variant="outlined">
                      {friends}
                    </Chip>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton
              component="a"
              href="/messages"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="outlined">
                {chatNumber}
              </Chip>
            </ListItemButton>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/documentation">
              <ArticleIcon />
              <ListItemContent>
                <Typography level="title-sm">User Guide</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton variant="plain" component="a" href="/settings">
              <SettingsRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Settings</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          
        </List>
      </Box>

      </List>

      <Divider />

      <Box 
        sx={{ display: "flex", gap: 1, alignItems: "center" }}
        component={"a"} 
        href={user ? `/user/${user.username}` : '/home'}
      >
        <Avatar variant="outlined" size="sm" src={user.profile} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{user.username}</Typography>
          <Typography level="body-xs">{user.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral" href="/" onClick={handleLogout}>
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>

    </CssVarsProvider>
  );
}

export default NavigationBar;
