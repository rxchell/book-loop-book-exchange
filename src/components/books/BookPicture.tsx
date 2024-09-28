// import { useAuthContext } from '@/context/AuthContext';
// import React, { useEffect, useState } from 'react';
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// const bookPicture = () => {
//   const { user } = useAuthContext() as { user: any }; 
//   const [bookUrl, setbookUrl] = useState('');

//   useEffect(() => {
//     if (user?.book) {
//       const storage = getStorage();
//       const bookRef = ref(storage, `book_pictures/${user.book}`);

//       getDownloadURL(bookRef)
//         .then((url) => {
//           console.log("book picture URL fetched:", url);
//           setbookUrl(url);
//         })
//         .catch((error) => {
//           console.error("Error fetching book picture:", error);
//         });
//     } else {
//       console.warn("No user book found");
//     }
//   }, [user]);

//   return (
//     <div>
//       <img 
//         id="bookPicture" 
//         src={user?.book ? bookUrl : "/person.svg"}  
//         alt="book" 
//         style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
//       />
//     </div>
//   );
// };

// export default bookPicture;