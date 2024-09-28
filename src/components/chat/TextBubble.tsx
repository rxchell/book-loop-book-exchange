import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { MessageProps } from '../../types/chats';
import { useAuthContext } from '@/context/AuthContext'; 
import { User } from '@/types/user';
import { useCallback,useEffect } from 'react';
import { retrieveUser } from '@/services/UserService';

type TextBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

export default function TextBubble(props: TextBubbleProps) {
  const { user } = useAuthContext() as { user: User };
  const { content, variant, time, sender } = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);

  const formattedTime = (time as any).toDate ? (time as any).toDate().toLocaleString() : new Date(time).toLocaleString();

  const [receiverUsername, setReceiverUsername] = React.useState<string>('');
  
  const getReceiver = useCallback(async () => {
    const receiverData = await retrieveUser(sender);
    setReceiverUsername(receiverData.username);
  }, [sender]);

  useEffect(() => {
    getReceiver();
  } , [getReceiver]);

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {isSent ? 'You' : (sender === 'You' ? 'You' : receiverUsername)}
        </Typography>
        <Typography level="body-xs">{formattedTime}</Typography>
      </Stack>
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? 'primary.main'
                : 'neutral.main',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? 'var(--joy-palette-common-white)'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {content}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? {
                      left: 0,
                      transform: 'translate(-100%, -50%)',
                    }
                  : {
                      right: 0,
                      transform: 'translate(100%, -50%)',
                    }),
              }}
            >
              <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '👍' : <ThumbUpAltRoundedIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? 'soft' : 'plain'}
                color={isCelebrated ? 'primary' : 'neutral'}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🙂' : <SentimentSatisfiedRoundedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
    </Box>
  );
}
