import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Star from '@mui/icons-material/Star';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import { Book } from '@/types/book';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import { retrieveUserFromUsername } from '@/services/UserService';
import { User } from '@/types/user';

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
    onLike 
  } = props;

  const [isLiked, setIsLiked] = React.useState(liked);
  const [owner, setOwner] = React.useState<User | null>(null);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    if (onLike) {
      onLike(props);
    }
  };

  async () => {
    const fetchedUser = await retrieveUserFromUsername(ownerUsername);
    setOwner(fetchedUser);
  };

  return (
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
      {/* Left column: Book image */}
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

      {/* Middle column: Book details */}
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1} alignItems="flex-start"> {/* Aligns to the left */}
          <Chip variant='outlined'>{category}</Chip>
          <Typography level="title-md" noWrap>
            <Link overlay underline="none" sx={{ color: 'text.primary' }}>
              {title}
            </Link>
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

      {/* Right column: Owner and location details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, minWidth: 160 }}>
        {/* Top-right: Like button */}
        <IconButton
          variant="plain"
          size="sm"
          color={isLiked ? 'danger' : 'neutral'}
          onClick={handleLikeClick}
          sx={{ alignSelf: 'flex-end', borderRadius: '50%' }}
        >
          <FavoriteRoundedIcon />
        </IconButton>

        {/* Avatar and owner details */}
        <Box 
          sx={{ display: "flex", justifyContent: "right" }}
          component={"a"}
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

        {/* Bottom-right: Exchange button */}
        <Button
          variant="soft"
          color="primary"
          sx={{ alignSelf: 'flex-end', marginTop: 2 }}
        >
          Exchange
        </Button>
      </Box>
    </Card>
  );
}
