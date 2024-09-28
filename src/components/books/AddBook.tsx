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
import { CssVarsProvider, CssBaseline } from '@mui/joy';
import theme from '@/theme';
import interestList from '@/data/interests.json';
import { useAuthContext } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { Book, Category } from "@/types/book"; 
import AlertStatus from '../AlertStatus';
import { addNewBook } from "@/services/BookService";
import { generateBookId } from '@/services/BookService';
import {getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import BookPicture from './BookPicture';
import { IconButton } from '@mui/joy';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function AddBook() {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [category, setCategory] = useState<Category | null>(null);
    const [location, setLocation] = useState<string>("");
    const [rating, setRating] = useState<number | null>(0);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [image, setImage] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
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

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleRatingChange = (value: number | null) => {
        setRating(value ? Number(value) : null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImage(URL.createObjectURL(file));  // Generate a preview URL for the selected image
        }
    };

    const uploadBookImage = async (file: File, bookId: string) => {
        const storage = getStorage();
    
        // You can use the bookId as part of the path to ensure uniqueness
        const storageRef = ref(storage, `book_images/${user.username}/${bookId}`);
    
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.error('User doesn\'t have permission to access the object');
                        break;
                    case 'storage/canceled':
                        console.error('User canceled the upload');
                        break;
                    case 'storage/unknown':
                        console.error('Unknown error occurred:', error.serverResponse);
                        break;
                }
            },
            
            // Upload completed successfully, now we can get the download URL
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setImage(downloadURL);
                console.log('File available at', downloadURL);
            }
        );
    };

    const submitBookDetails = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bookId = generateBookId();
        if (imageFile) await uploadBookImage(imageFile, bookId);
    
        const newBook: Book = {
            bookId,
            title,
            author,
            category: category as Category,
            image, // This will be the URL from Firebase
            location,
            rating: rating ?? 0,
            ownerUsername: user.username,
        };
    
        await addNewBook(newBook);
        
        setAlert({ show: true, success: true, message: 'Book added successfully!' });
        
        // Set a timeout to hide the alert after 5 seconds
        setTimeout(() => {
            setAlert({ show: false, success: false, message: '' });
        }, 5000); // 5000 ms = 5 seconds

        // Clear the form after submission if desired
        setTitle("");
        setAuthor("");
        setCategory(null);
        setImage("");
        setLocation("");
        setRating(null);
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

                        <Box 
                            sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%'                   
                        }}
                        >
                            
                        <Box component="form" sx={{flex: 3, display: 'flex', flexDirection: 'row' }}>

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
                                <FormLabel>Category of the book</FormLabel>
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
                                <FormLabel>Mode of book exchange</FormLabel>
                                <Input size="sm"
                                    placeholder="Specify Delivery or Meetup details"
                                    value={location}
                                    onChange={handleLocationChange}
                                    fullWidth />
                            </FormControl>

                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Rating</FormLabel>
                                <Select
                                    size="sm"
                                    value={rating}
                                    onChange={(e, newValue) =>
                                        handleRatingChange(newValue)}>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Option key={value} value={value}>
                                            {value}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            
                            {/* <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Cover Image</FormLabel>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                {image && (
                                    <AspectRatio ratio="1" sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                        <img src={image} alt="Cover Preview" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </AspectRatio>
                                )}
                            </FormControl> */}
                        </Stack>

                            {/* Book Image */}
                            <Box component="form" sx={{flex: 1, display: 'flex', alignItems: 'top', paddingLeft: 2, paddingRight: 2 }}>
                                <FormControl sx={{
                                    width: '100%',
                                    height: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>

                                    <FormLabel sx={{paddingTop: 1}}>
                                        Book Image
                                    </FormLabel>

                                    <AspectRatio
                                        ratio="1"
                                        sx={{
                                            width: '50%',
                                            height: '50%',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'transparent',
                                            position: 'relative',
                                        }}
                                        objectFit="cover"
                                    >
                                        <img
                                            src={image ? image : '/blank.svg'}  // Use the updated `image` state for preview
                                            alt="Cover Preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '0%',
                                            }}
                                        />
                                        <BookPicture />
                                    </AspectRatio>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="profile-picture"
                                    />
                                    <label htmlFor="profile-picture">
                                        <IconButton
                                            aria-label="upload new picture"
                                            size="sm"
                                            variant="outlined"
                                            color="primary"
                                            component="span"
                                            sx={{
                                                bgcolor: 'background.body',
                                                position: 'absolute',
                                                right: '6%',
                                                bottom: '6%',
                                                borderRadius: '50%',
                                                boxShadow: 'sm',
                                            }}
                                        >
                                            <EditRoundedIcon/>
                                        </IconButton>
                                    </label>
                                </FormControl>
                            </Box>

                            </Box>
                        </Box>

                        <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                            <Button type={"submit"}>List this Book for Exchange</Button>
                        </CardActions>

                    </Card>

                </Box>
            </Box>
        </CssVarsProvider>
    );
}