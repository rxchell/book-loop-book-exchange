import * as  React from 'react';
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
import IconButton from '@mui/joy/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import {CssVarsProvider, CssBaseline} from '@mui/joy';
import theme from '@/theme';
import interestList from '@/data/interests.json' ;
import {useAuthContext} from "@/context/AuthContext";
import {useCallback, useEffect, useState} from "react";
import {Gender, User} from "@/types/user";
import {retrieveUser, updateUserData} from "@/services/UserService";
import AlertStatus from '../AlertStatus';
import {getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ProfilePicture from './ProfilePicture';

export default function MyProfile() {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("-");
    const [interests, setInterests] = useState<string[]>([]);
    const [lookingFor, setLookingFor] = useState<string[]>([]);
    const [profile, setProfile] = useState<string>("");
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });

    const {user} = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }

    const getUser = useCallback(async () => {
        const userData = await retrieveUser(user.email) as User;
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setUsername(userData.username);
        setEmail(userData.email);
        userData.gender === undefined
            ? setGender("-")
            : setGender(userData.gender);
        userData.interests === undefined
            ? setInterests([])
            : setInterests(userData.interests);
        userData.lookingFor === undefined
            ? setLookingFor([])
            : setLookingFor(userData.lookingFor);
        userData.profile === undefined
            ? setProfile("")
            : setProfile(userData.profile);
            console.log(`Profile picture: ${userData.profile}`)
    }, [user.email]);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleGenderChange = (value: string | null) => {
        setGender(value ? value : "");
    };

    const handleInterestsChange = (value: string[] | null) => {
        setInterests(value ? value : []);
    };

    const handleLookingForChange = (value: string[] | null) => {
        setLookingFor(value ? value : []);
    };

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0])
            setProfileFile(e.target.files[0]);
    }

    const uploadProfilePicture = async (file: File) => {
        // Get a root reference to the storage service, which is used to create reference in the storage bucket
        const storage = getStorage();

        const metadata = { contentType: 'image/png' };

        // Cloud Storage upload / download: Create a reference from an HTTPS URL
        const storageRef = ref(storage, `profile_pictures/${user.email}`); 
        
        // Upload file and metadata
        // 'file' comes from the Blob or File API
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
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
                setProfile(downloadURL);

                // Update Firestore with the new profile URL
                try {
                    const updatedUser = {
                        ...user,
                        profile: downloadURL,
                    };
                    await updateUserData(updatedUser);
                    console.log('Profile updated in Firestore');
                } catch (error) {
                    console.error('Error updating profile in Firestore:', error);
                }
            }
        ); 
    }

    useEffect(() => {
        if (profileFile) {
            uploadProfilePicture(profileFile);
        }
    }, [profileFile]);

    useEffect(() => {
        getUser()
    }, [getUser]);

    const submitProfileSettings = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateUserData({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                gender: gender as Gender,
                interests: interests,
                lookingFor: lookingFor,
                profile: profile
            });
            setAlert({show: true, success: true, message: 'Profile updated successfully!'});
        } catch (error) {
            console.error('Error updating profile:', error);
            setAlert({show: true, success: false, message: 'Profile update failed!'});
        } finally {
            setTimeout(() => {
                setAlert({show: false, success: false, message: ''});
            }, 5000);
        }
    }

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline/>

            <Box sx={{flex: 1, width: '90%', justifyContent: 'center'}}>

                <Box
                    sx={{
                        position: 'sticky',
                        top: {sm: -100, md: -110},
                        bgcolor: 'background.body',
                        zIndex: 9995,
                    }}
                >
                    <Box sx={{px: {xs: 2, md: 5}}}>
                        <Typography level="h1" component="h1" sx={{mt: 1}}>
                            My profile
                        </Typography>
                    </Box>
                </Box>

                <Box 
                    component="form"
                    onSubmit={submitProfileSettings}
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 2,
                    width: '100%'
                }}>

                    {/* Profile Details */}
                    <Card sx={{width: '100%', height: '100%'}}>
                    
                    {alert.show && <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
                        <AlertStatus success={alert.success} message={alert.message} />
                        </Box>}

                        {/* Align profile details and picture */}
                        <Box 
                            sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%'                   
                        }}
                        >
                            
                            <Box component="form" sx={{flex: 3, display: 'flex', flexDirection: 'row' }}>
                                <Stack
                                direction="column"
                                spacing={3}
                                sx={{ py: 1, px: 2, flexGrow: 1 }}
                                >
                                    {/* First name and Last name */}
                                    <Stack direction="row" spacing={3}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input size="sm"
                                                    placeholder="First name"
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    fullWidth/>
                                        </FormControl>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Last name</FormLabel>
                                            <Input size="sm"
                                                    placeholder="Last name"
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    fullWidth />
                                        </FormControl>
                                    </Stack>

                                    {/* Email and Gender */}
                                    <Stack direction="row" spacing={3}>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Username</FormLabel>
                                            <Input size="sm"
                                                    type="username"
                                                    placeholder="Username"
                                                    value={username}
                                                    onChange={handleUsernameChange}
                                                    disabled
                                                    fullWidth/>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Gender</FormLabel>
                                            <Select size="sm"
                                                    value={gender}
                                                    onChange={(e, newValue) =>
                                                        handleGenderChange(newValue)}>
                                                <Option value="F">F</Option>
                                                <Option value="M">M</Option>
                                                <Option value="-">-</Option>
                                            </Select>
                                        </FormControl>
                                    </Stack>

                                    <Stack>
                                        <FormControl sx={{flexGrow: 1}}>
                                            <FormLabel>Email</FormLabel>
                                            <Input size="sm"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                    disabled
                                                    fullWidth/>
                                        </FormControl>
                                    </Stack>

                                    {/* Interests (multiselect) */}
                                    <Stack>
                                        <FormControl>
                                            <FormLabel>I am interested in these genres of books:</FormLabel>
                                            <Autocomplete
                                                multiple  // Allow multiple selections
                                                size="sm"
                                                autoHighlight
                                                value={interests}
                                                onChange={(e, newValue) =>
                                                    handleInterestsChange(newValue)}
                                                options={interestList}
                                                renderOption={(optionProps, option) => (
                                                    <AutocompleteOption {...optionProps}>
                                                        {option}
                                                    </AutocompleteOption>
                                                )}
                                            />
                                        </FormControl>
                                    </Stack>

                                    {/* Genres that the user is looking for (multiselect from interests.json) */}
                                    <Stack>
                                    <FormControl>
                                        <FormLabel>I am looking for these genres of books:</FormLabel>
                                            <Autocomplete
                                                multiple  // Allow multiple selections
                                                size="sm"
                                                autoHighlight
                                                value={lookingFor}
                                                onChange={(e, newValue) =>
                                                    handleLookingForChange(newValue)}
                                                options={interestList}
                                                renderOption={(optionProps, option) => (
                                                    <AutocompleteOption {...optionProps}>
                                                        {option}
                                                    </AutocompleteOption>
                                                )}
                                            />
                                        </FormControl>
                                    </Stack>
                                    </Stack>
                                </Box>

                            {/* Profile Picture */}
                            <Box component="form" sx={{flex: 1, display: 'flex', alignItems: 'top', paddingLeft: 2, paddingRight: 2 }}>
                                <FormControl sx={{
                                    width: '100%',
                                    height: '80%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>

                                    <FormLabel sx={{paddingTop: 1}}>
                                        Profile Picture
                                    </FormLabel>

                                    <AspectRatio
                                        ratio="1"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
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
                                            src={profile ? profile : "/blank.svg"}
                                            alt=""
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '0%',
                                            }}
                                        />
                                        <ProfilePicture/>
                                    </AspectRatio>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfileChange}
                                        style={{ display: 'none' }}
                                        id="profile-picture"
                                    />
                                    <label htmlFor="profile-picture">
                                        <IconButton
                                            aria-label="upload new picture"
                                            size="sm"
                                            variant="solid"
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

                        {/* Box for profile details and picture */}
                        </Box>

                        <CardActions sx={{p: 2, justifyContent: 'center'}}>
                            <Button type={"submit"}>
                                Update profile
                            </Button>
                        </CardActions>

                    </Card>
                
                {/* Box for card */}
                </Box>

            {/* Box for whole page */}
            </Box> 

        </CssVarsProvider>
    );
}