import {User} from "@/types/user";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Avatar } from "@mui/joy";

interface UserDisplayProps {
    user: User
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
    return (
        <div>
            <Box sx={{
                p:1.5,
                border: '1px solid #ccc',
                borderRadius: 15, 
            }}>
                <Box sx={{display: 'flex'}}>
                    <Avatar src={user.profile} sx={{width: 50, height: 50}}/>
                    <div style={{ marginLeft: '16px' }}>
                        <Typography level="title-lg"
                                    color="primary"
                                    component="a"
                                    href={"/user/" + user.username}>
                            @{user.username}
                        </Typography>
                        <Typography level="title-sm">
                            {user.firstName} {user.lastName}
                        </Typography>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default UserDisplay;