'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/90 backdrop-blur-md border-b border-primary/30 shadow-[0_0_20px_rgba(255,45,120,0.1)]">
        <div className="flex items-center gap-8">
          <Link className="text-2xl font-bold font-headline tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.8)]" href="/">
            NEON-ACTION
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 drop-shadow-[0_0_8px_rgba(255,45,120,0.6)] font-label text-sm uppercase tracking-wider" href="/">
              Movies
            </Link>
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="#">
              Series
            </Link>
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="/kategori">
              Live
            </Link>
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="#">
              Student Perks
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">search</span>
            <input className="bg-surface-container border-none focus:ring-1 focus:ring-secondary rounded-full pl-10 pr-4 py-1.5 text-sm w-48 lg:w-64 transition-all" placeholder="Search universe..." type="text" />
          </div>
          <button className="p-2 rounded-full hover:bg-surface-variant/50 transition-all text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full border border-secondary/50 overflow-hidden cursor-pointer active:scale-95 duration-150 bg-surface-variant">
          </div>
        </div>
      </header>

      {/* Mobile Nav Toggle */}
      <button
        className="lg:hidden fixed top-4 right-4 z-[60] p-2 bg-background/80 backdrop-blur-md rounded-lg border border-primary/30 text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          <Link href="/" className="text-2xl font-headline font-bold text-primary" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/detail" className="text-2xl font-headline font-bold text-on-surface-variant hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Detail</Link>
          <Link href="/kategori" className="text-2xl font-headline font-bold text-on-surface-variant hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link href="/pencarian" className="text-2xl font-headline font-bold text-on-surface-variant hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Search</Link>
        </div>
      )}
    </>
  );
}
