'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import firebase_app from '@/firebase/config';
import { db } from '@/firebase/config';
import { User } from '@/types/user';  // Import your User type
import { Skeleton, Box, Typography } from '@mui/joy';
import Image from 'next/image';

const auth = getAuth(firebase_app);

interface AuthContextType {
  user: User | null;
  refreshUser: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.email!));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUser = async (email: string) => {
    const userDoc = await getDoc(doc(db, 'users', email));
    if (userDoc.exists()) {
      setUser(userDoc.data() as User);
    }
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <Skeleton sx={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
          <Box
            sx={{
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            <Image src="/logo.svg" alt="Logo" width={170} height={100} />
            <Typography level="title-md" sx={{ marginTop: 2 }}>
              Loading...
            </Typography>
          </Box>
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}