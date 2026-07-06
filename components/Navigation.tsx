'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-xl text-light hidden sm:inline group-hover:text-primary transition-colors">
              StudyFlash AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/upload" className="nav-link">Upload</Link>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/about" className="btn-primary py-2 px-4 ml-4">Tentang</Link>
          </div>

          <button
            className="md:hidden flex items-center text-light p-2 hover:bg-surface-light rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border/50 pt-4 mt-1">
            <Link href="/" className="mobile-nav-link">Home</Link>
            <Link href="/upload" className="mobile-nav-link">Upload</Link>
            <Link href="/dashboard" className="mobile-nav-link">Dashboard</Link>
            <Link href="/about" className="mobile-nav-link">Tentang</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
