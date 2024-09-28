import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from 'next/link'; // Make sure to import Link from 'next/link'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Star from '@mui/icons-material/Star';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import { Book } from '@/types/book';
import Box from '@mui/joy/Box';
import { retrieveUserFromUsername } from '@/services/UserService';
import { User } from '@/types/user';
import ChatToExchange from '@/features/books/ChatToExchange';
import { useAuthContext } from '@/context/AuthContext';
import Tooltip from '@mui/joy/Tooltip';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from "@/theme";
import { CssBaseline } from "@mui/joy";
import MarkAsExchanged from '@/features/books/MarkAsExchanged';

type BookCardProps = Book & {
  liked?: boolean;
  onLike?: (book: Book) => void;
};

export default function BookCard(props: BookCardProps) {
  const { 
    category, 
    title, 
    author, 
    liked = false, 
    image, 
    location, 
    rating, 
    ownerUsername, 
    onLike, 
  } = props;

  const { user } = useAuthContext() as { user: User };

  const [isLiked, setIsLiked] = React.useState(liked);
  const [owner, setOwner] = React.useState<User | null>(null);
  const [openCreateChat, setOpenCreateChat] = React.useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    if (onLike) {
      onLike(props);
    }
  };

  React.useEffect(() => {
    const fetchOwner = async () => {
      const fetchedUser = await retrieveUserFromUsername(ownerUsername);
      setOwner(fetchedUser);
    };
    fetchOwner();
  }, [ownerUsername]);

  const handleCloseCreateChat = () => {
    setOpenCreateChat(false);
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'neutral.softBg',
          display: 'flex',
          flexDirection: 'row',
          maxHeight: '400px',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: 'lg',
            borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          sx={{
            minWidth: { sm: 120, md: 160 },
            maxHeight: '160px',
            marginRight: 2,
          }}
        >
          <img alt={title} src={image} style={{ objectFit: 'cover' }} />
        </AspectRatio>

        <CardContent sx={{ flex: 1 }}>
          <Stack spacing={1} alignItems="flex-start">
            <Chip variant='outlined'>{category}</Chip>
            <Typography level="title-md" noWrap>
                {title}
            </Typography>
            <Typography level="body-sm" sx={{ fontWeight: '600' }} noWrap>
              by {author}
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {[...Array(5)].map((_, index) => (
                <Star key={index} sx={{ color: index < Math.floor(rating) ? 'warning.400' : 'warning.200' }} />
              ))}
            </Stack>
          </Stack>
        </CardContent>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, minWidth: 160 }}>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? 'danger' : 'neutral'}
            onClick={handleLikeClick}
            sx={{ alignSelf: 'flex-end', borderRadius: '50%' }}
          >
            <FavoriteRoundedIcon />
          </IconButton>

          <Box 
            sx={{ display: "flex", justifyContent: "right" }}
            component={Link} // Change to Link for user profile
            href={ownerUsername ? `/user/${ownerUsername}` : '/home'}
          >
            <Typography level="body-xs" sx={{ color: 'text.tertiary' }} noWrap>
              Listed by 
            </Typography>
            <Typography level="title-sm" paddingLeft={1}>{ownerUsername}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Typography level="body-xs" noWrap paddingTop={1} sx={{ color: 'text.primary' }}>
              {location}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            {owner && user && owner.username !== user.username ? (
              <Tooltip title={`Chat with ${ownerUsername}`} arrow> 
                <Link href="/messages" passHref>
                  <Button
                    variant="soft"
                    color="success"
                    sx={{ alignSelf: 'flex-end', marginTop: 2 }}
                  >
                    Exchange
                  </Button>
                </Link>
              </Tooltip>
            ) : (
              <MarkAsExchanged />
            )}
          </Box>
        </Box>

        {owner && (
          <ChatToExchange 
            user={user}
            open={openCreateChat} 
            onClose={handleCloseCreateChat} 
            setSelectedChat={() => {}} 
            owner={owner}
          />
        )}
      </Card>
    </CssVarsProvider>
  );
}
