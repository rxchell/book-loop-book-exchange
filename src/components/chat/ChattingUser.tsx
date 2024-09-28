import * as React from 'react';
import Badge from '@mui/joy/Badge';
import Avatar, { AvatarProps } from '@mui/joy/Avatar';
import { retrieveUser } from '@/services/UserService';
import { User } from '@/types/user';

type ChattingUserProps = AvatarProps & {
  email: string; 
  online?: boolean;
};

const ChattingUser: React.FC<ChattingUserProps> = ({ email, online = false, ...other }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await retrieveUser(email);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [email]);

  if (!user) {
    return null; // Or display a loading indicator while fetching user data
  }

  const { username, profile } = user;

  return (
    <div>
      <Badge
        color={online ? 'success' : 'success'}
        variant={online ? 'solid' : 'soft'}
        size="sm"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="4px 4px"
      >
        <Avatar size="sm" alt={username} src={profile} {...other} />
      </Badge>
    </div>
  );
};

export default ChattingUser;
