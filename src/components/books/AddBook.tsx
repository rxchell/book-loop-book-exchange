import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Autocomplete from '@mui/joy/Autocomplete';
import { CssVarsProvider, CssBaseline } from '@mui/joy';
import theme from '@/theme';
import interestList from '@/data/interests.json';
import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { Book, Category } from "@/types/book"; // Import the Book and Category types
import AlertStatus from '../AlertStatus';

export default function AddBook() {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [image, setImage] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [rating, setRating] = useState<number | null>(0);
    const [ownerUsername, setOwnerUsername] = useState<string>("");
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });

    const { user } = useAuthContext() as { user: any };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(event.target.value);
    };

    const handleCategoryChange = (event: any, value: string | null) => {
        setCategory(value as Category);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleRatingChange = (event: any, value: string | null) => {
        setRating(value ? Number(value) : null);
    };

    const submitBookDetails = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newBook: Book = {
            bookId: "", 
            title,
            author,
            category: category as Category,
            image,
            location,
            rating: rating ?? 0,
            ownerUsername,
        };
        // Here you would handle the logic to add the book to your database or state

        setAlert({ show: true, success: true, message: 'Book added successfully!' });
        
        // Clear the form after submission if desired
        setTitle("");
        setAuthor("");
        setCategory(null);
        setImage("");
        setLocation("");
        setRating(null);
        setOwnerUsername(user.username);
    };

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ flex: 1, width: '90%', justifyContent: 'center' }}>
                <Box
                    sx={{
                        position: 'sticky',
                        top: { sm: -100, md: -110 },
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >
                    <Box sx={{ px: { xs: 2, md: 5 } }}>
                        <Typography level="h1" component="h1" sx={{ mt: 1 }}>
                            Add a Book
                        </Typography>
                        <Typography level="h4" component="h2" sx={{ mt: 1 }}>
                            Fill in the details of the book you want to list.
                        </Typography>
                    </Box>
                </Box>

                <Box
                    component="form"
                    onSubmit={submitBookDetails}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 2,
                        width: '100%'
                    }}>

                    <Card sx={{ width: '100%', height: '100%' }}>
                        {alert.show && (
                            <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                                <AlertStatus success={alert.success} message={alert.message} />
                            </Box>
                        )}

                        <Stack direction="column" spacing={3} sx={{ py: 1, px: 2, flexGrow: 1 }}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Title</FormLabel>
                                <Input size="sm"
                                    placeholder="Book Title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    fullWidth />
                            </FormControl>

                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Author of the book</FormLabel>
                                <Input size="sm"
                                    placeholder="Author"
                                    value={author}
                                    onChange={handleAuthorChange}
                                    fullWidth />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    size="sm"
                                    value={category}
                                    onChange={(event, value) => handleCategoryChange(event, value)}
                                >
                                    <Option value="" disabled>Select a category</Option>
                                    {interestList.map((interest) => (
                                        <Option key={interest} value={interest}>
                                            {interest}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Mode of book exchange (Specify Delivery or Meetup details)</FormLabel>
                                <Input size="sm"
                                    placeholder="Location"
                                    value={location}
                                    onChange={handleLocationChange}
                                    fullWidth />
                            </FormControl>

                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Rating</FormLabel>
                                <Select
                                    size="sm"
                                    value={rating !== null ? rating.toString() : ""}
                                    onChange={handleRatingChange}
                                >
                                    {/* Generate options from 1 to 5 */}
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Option key={value} value={value}>
                                            {value}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>


                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Cover Image</FormLabel>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                {image && (
                                    <AspectRatio ratio="1" sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                        <img src={image} alt="Cover Preview" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </AspectRatio>
                                )}
                            </FormControl>
                        </Stack>

                        <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                            <Button type={"submit"}>Add Book</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}