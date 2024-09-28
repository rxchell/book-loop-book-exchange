import {useEffect, useState} from "react";
import {User} from "@/types/user";
import {retrieveFriendRequests} from "@/services/UserService";
import UserDisplay from "@/features/search/components/UserDisplay";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

interface RequestProps {
    currentUser: string;
}

const Requests: React.FC<RequestProps> = ({currentUser}) => {
    const [requests, setRequests] = useState<User[]>([]);

    useEffect(() => {
        const getAndSetAllUsers = async () => {
            const masterlist = await retrieveFriendRequests(currentUser);
            setRequests(masterlist);
        }
        getAndSetAllUsers()
    }, [currentUser]);


    return (
        <Box sx={{p: 5}}>
            {
                requests.length != 0
                    ? requests.map(
                        u => (
                            <Box sx={{
                                marginTop: 2,
                                marginBottom: 2
                            }}
                                 key={u.email}>
                                <UserDisplay user={u}/>
                            </Box>
                        )
                    )
                    : <Typography>
                        You have no pending friend requests at this time.
                    </Typography>
            }
        </Box>
    )
}

export default Requests;