import {useEffect, useState} from "react";
import {User} from "@/types/user";
import UsernameSearch from "@/features/search/components/UsernameSearch";
import {getAllUsers} from "@/services/UserService";
import UserDisplay from "@/features/search/components/UserDisplay";
import Box from "@mui/joy/Box";

const Search = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentSet, setCurrentSet] = useState<User[]>([]);

    useEffect(() => {
        const getAndSetAllUsers = async () => {
            const masterlist = await getAllUsers();
            setUsers(masterlist);
            setCurrentSet(masterlist);
        }

        getAndSetAllUsers()
    }, []);

    const handleChangeFilter = (users: User[]) => {
        setCurrentSet(users)
    }

    return (
        <Box sx={{p:5}}>
            <UsernameSearch users={users} onSetFilter={handleChangeFilter}/>
            {currentSet.map(
                u => (
                    <Box sx={{
                        marginTop:2,
                        marginBottom:2
                    }}
                         key={u.email}>
                        <UserDisplay user={u}/>
                    </Box>
                )
            )}
        </Box>
    )
}

export default Search;