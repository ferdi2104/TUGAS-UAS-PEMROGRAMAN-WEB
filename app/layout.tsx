'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from '@components/Navigation';
import '@styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="NEON-ACTION | Student Access Granted" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <title>NEON-ACTION | Student Access Granted</title>
      </head>
      <body className="antialiased selection:bg-primary/30 selection:text-primary">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#141422',
              color: '#e8e0f0',
              border: '1px solid rgba(0,255,204,0.2)',
            },
          }}
        />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
