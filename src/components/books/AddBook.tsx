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
import { generateBookId, updateListedBookRecords, addNewBook } from '@/services/BookService';
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
    const [downloadURL, setDownloadURL] = useState<string>("");
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
            console.log('File selected:', file); // Add this line for debugging
            setImageFile(file);
            setImage(URL.createObjectURL(file));  // Generate a preview URL for the selected image
            console.log('Image preview:', URL.createObjectURL(file)); // Add this line for debugging
        } else {
            console.log('No file selected'); // Add this for debugging when no file is selected
        }
    };

    const uploadBookImage = async (file: File, bookId: string): Promise<string> => {
        const storage = getStorage();
        const metadata = { contentType: file.type };
        
        const storageRef = ref(storage, `book_images/${user.username}/${bookId}`);
        
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('Download URL:', downloadURL);  // Log the Firebase URL
                        resolve(downloadURL);  // Resolve the promise with the download URL
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };    
    
    const submitBookDetails = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const bookId = generateBookId();  // Generate a unique ID for the book
        let bookImageURL = '';
    
        // Check if an image file is selected and upload it
        if (imageFile) {
            bookImageURL = await uploadBookImage(imageFile, bookId);  // Wait for the image to be uploaded
        }
    
        console.log('Book image after upload:', bookImageURL); // Now this will log the Firebase URL
        
        const newBook: Book = {
            bookId,
            title,
            author,
            category: category as Category,
            image: bookImageURL,  // Use the URL from Firebase directly
            location,
            rating: rating ?? 0,
            ownerUsername: user.username,
        };
    
        // Add the new book to your database or Firestore
        await addNewBook(newBook);
        await updateListedBookRecords(user.email, bookId);
    
        // Handle success message and reset form as you have been doing
        setAlert({ show: true, success: true, message: 'Book added successfully!' });
        
        // Reset the form fields
        setTitle("");
        setAuthor("");
        setCategory(null);
        setImage("");  // Reset image state
        setImageFile(null);
        setLocation("");
        setRating(null);    
    
        // Hide the alert after a timeout
        setTimeout(() => {
            setAlert({ show: false, success: false, message: '' });
        }, 5000);  // 5000 ms = 5 seconds
    };    

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ flex: 1, width: '80%', justifyContent: 'center' }}>
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
                        width: '100%',
                        paddingLeft: 5
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
                        </Stack>

                            {/* Book Image */}
                            <Box component="form" sx={{flex: 1, display: 'flex', alignItems: 'top', paddingLeft: 2, paddingRight: 2, height: 'auto' }}>
                                <FormControl sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>

                                    <FormLabel sx={{paddingTop: 1}}>
                                        Book Image
                                    </FormLabel>

                                    <AspectRatio
                                        ratio="1"
                                        sx={{
                                            width: '280px',
                                            height: '390px',
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
                                            src={image ? image : "/blank.svg"}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '0%',
                                            }}
                                        />
                                        <BookPicture/>
                                    </AspectRatio>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="book-image"
                                    />
                                    <label htmlFor="book-image">
                                        <IconButton
                                            aria-label="upload book image"
                                            size="sm"
                                            variant="outlined"
                                            color="primary"
                                            component="span"
                                            sx={{
                                                bgcolor: 'background.body',
                                                position: 'absolute',
                                                right: '-1%',
                                                bottom: '1%',
                                                borderRadius: '50%',
                                                boxShadow: 'sm',
                                            }}
                                        >
                                            <EditRoundedIcon />
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