import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { toggleChatsPane } from '@/utils/messages';
import { User } from '@/types/user';
import { useAuthContext } from '@/context/AuthContext';
import { useCallback,useEffect } from 'react';
import { retrieveUser } from '@/services/UserService';

type ConversationDisplayProps = {
  receiver: string;
};

export default function ConversationDisplay(props: ConversationDisplayProps) {
  const { receiver } = props;
  const { user } = useAuthContext() as { user: User };

  const [receiverUser, setReceiverUser] = React.useState<User>();
  const [receiverUsername, setReceiverUsername] = React.useState<string>('');
  
  const getReceiver = useCallback(async () => {
    const receiverData = await retrieveUser(receiver);
    setReceiverUser(receiverData);
    setReceiverUsername(receiverData.username);
  }, [receiver]);

  useEffect(() => {
    getReceiver();
  } , [getReceiver]);

  if (!receiver) {
    return null; 
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.body',
      }}
      py={{ xs: 2, md: 2 }}
      px={{ xs: 1, md: 2 }}
    >
      <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
          }}
          onClick={() => toggleChatsPane()}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
          <Avatar size="lg" src={receiverUser?.profile} />
        <div>
          <Typography
          >
            {receiverUsername}
          </Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          color="primary"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
          component={"a"} 
          href={user ? `/user/${receiverUsername}` : '/home'}
        >
          View profile
        </Button >
      </Stack>
    </Stack>
  );
}
