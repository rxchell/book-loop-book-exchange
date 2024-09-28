import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import theme from '@/theme';
import { CssVarsProvider } from '@mui/joy/styles';

// Load the Inter font with 'latin' subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
  title: 'Book Loop',
  description: 'A book exchange platform for everyone.',
};

// Root layout component for the application
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <CssVarsProvider theme={theme}>
          <Header />
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </CssVarsProvider>
      </body>
    </html>
  );
}
