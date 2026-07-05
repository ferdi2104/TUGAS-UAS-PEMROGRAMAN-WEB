'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">📚</span>
              <span className="font-bold text-xl text-dark hidden sm:inline">StudyFlash AI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/upload" className="hover:text-primary transition-colors">
              Upload
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/about" className="btn-primary py-2 px-4">
              Tentang
            </Link>
          </div>

          <button
            className="md:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Home
            </Link>
            <Link
              href="/upload"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Upload
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 hover:bg-gray-100 rounded"
            >
              Tentang
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
