import {User} from "@/types/user";
import React, {useState} from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

interface UsernameSearchProps {
    users: User[];
    onSetFilter: (users: User[]) => void
}

const UsernameSearch: React.FC<UsernameSearchProps> = ({users, onSetFilter}) => {

    const [search, setSearch] = useState("");

    const handleChangeSearch = () => {
        onSetFilter(search == ""
            ? users
            : users.filter(
                u => (u.username !== undefined && u.username.includes(search))
            ))
    }

    return (
        <div>
            <Stack
                direction="row"
                alignItems="flex-end"
                spacing={2}
            >
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a username here!"
                />
                <Button variant="solid" onClick={handleChangeSearch}>
                    Search
                </Button>
            </Stack>

        </div>
    )
}

export default UsernameSearch;