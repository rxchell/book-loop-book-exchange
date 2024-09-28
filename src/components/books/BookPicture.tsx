import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProfilePicture = () => {
  const { user } = useAuthContext() as { user: any }; 
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    if (user?.book) {
      const storage = getStorage();
      const bookRef = ref(storage, `book_pictures/${user.email}`);

      getDownloadURL(bookRef)
        .then((url) => {
          console.log("book picture URL fetched:", url);
          setbookUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching book picture:", error);
        });
    } else {
      console.warn("No user book found");
    }
  }, [user]);

  return (
    <div>
      <img 
        id="profilePicture" 
        src={user?.profile ? profileUrl : "/person.svg"}  
        alt="Profile" 
        style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
      />
    </div>
  );
};

export default ProfilePicture;