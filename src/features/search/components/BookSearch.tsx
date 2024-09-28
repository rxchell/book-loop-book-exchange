import { Book } from "@/types/book";
import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

interface BookSearchProps {
    books: Book[];
    onSetFilter: (books: Book[]) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ books, onSetFilter }) => {
    const [search, setSearch] = useState("");

    const handleChangeSearch = () => {
        onSetFilter(
            search === ""
                ? books
                : books.filter(
                    (b) =>
                        (b.title && b.title.toLowerCase().includes(search.toLowerCase())) ||
                        (b.author && b.author.toLowerCase().includes(search.toLowerCase()))
                )
        );
    };

    return (
        <div>
            <Stack direction="row" alignItems="flex-end" spacing={1} sx={{ width: '100%', paddingTop: 1, paddingBottom: 2 }}>
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a book title or author here!"
                    sx={{ flexGrow: 1 }} // This will make the input take all available space
                />
                <Button variant="solid" onClick={handleChangeSearch}>
                    Search
                </Button>
            </Stack>
        </div>
    );
};

export default BookSearch;
