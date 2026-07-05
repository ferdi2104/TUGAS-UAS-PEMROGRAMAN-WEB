'use client';

import { ReactNode } from 'react';
import Navigation from '@components/Navigation';
import '@styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="StudyFlash AI - Platform SaaS untuk generate flashcard dari catatan/PDF" />
        <title>StudyFlash AI - Learn Smarter</title>
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen bg-light">
          {children}
        </main>
      </body>
    </html>
  );
}
