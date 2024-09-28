import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Star from '@mui/icons-material/Star';
import { Book } from '@/types/book';

type BookCardProps = Book & {
  liked?: boolean;
  onLike?: (book: Book) => void; // Callback to handle like action
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

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    if (onLike) {
      onLike(props); // Pass the entire book object for onLike
    }
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <img alt={title} src={image} />
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              width: '100%',
              p: 1,
            }}
          >
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? 'danger' : 'neutral'}
              onClick={handleLikeClick}
              sx={{
                display: { xs: 'flex', sm: 'none' },
                ml: 'auto',
                borderRadius: '50%',
                zIndex: '20',
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div>
            <Typography level="body-sm">{category}</Typography>
            <Typography level="title-md">
              <Link overlay underline="none" sx={{ color: 'text.primary' }}>
                {title}
              </Link>
            </Typography>
            <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
              by {author}
            </Typography>
            <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
              Listed by {ownerUsername} {/* Display owner username */}
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? 'danger' : 'neutral'}
            onClick={handleLikeClick}
            sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: '50%' }}
          >
            <FavoriteRoundedIcon />
          </IconButton>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          sx={{ flexWrap: 'wrap', my: 0.25 }}
        >
          <Typography level="body-xs">
            {location}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 'auto' }}>
          <Typography
            level="title-sm"
            startDecorator={
              <React.Fragment>
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.400' }} />
                <Star sx={{ color: 'warning.200' }} />
              </React.Fragment>
            }
            sx={{ display: 'flex', gap: 1 }}
          >
            {rating.toFixed(1)} {/* Display rating with one decimal place */}
          </Typography>
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
            <strong>Free</strong>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}