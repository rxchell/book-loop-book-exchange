import { useAuthContext } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProfilePicture = () => {
  const { user } = useAuthContext() as { user: any }; 
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    if (user?.profile) {
      const storage = getStorage();
      const profileRef = ref(storage, `profile_pictures/${user.email}`);

      getDownloadURL(profileRef)
        .then((url) => {
          console.log("Profile picture URL fetched:", url);
          setProfileUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching profile picture:", error);
        });
    } else {
      console.warn("No user profile found");
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
