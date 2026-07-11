'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@lib/types';

const fallbackCategories: Category[] = [
  { name: 'High-Octane', icon: 'directions_car', description: 'Extreme speed, explosive pursuits, and relentless momentum across urban landscapes.', color: 'primary', tag: 'Primary Core' },
  { name: 'Martial Arts', icon: 'swords', description: null, color: 'tertiary', tag: 'Traditional Combat' },
  { name: 'Cyberpunk', icon: 'language', description: null, color: 'secondary', tag: 'Dystopian Tech' },
  { name: 'Heist', icon: 'lock', description: 'Strategic infiltration and high-stakes precision strikes.', color: 'primary', tag: 'Tactical Ops' },
  { name: 'Revenge', icon: 'gavel', description: null, color: 'primary', tag: 'Personal War' },
  { name: 'Superhuman', icon: 'bolt', description: null, color: 'tertiary', tag: 'Augmented Power' },
];

export default function KategoriPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) setCategories(data);
          else setCategories(fallbackCategories);
        } else {
          setCategories(fallbackCategories);
        }
      } catch {
        setCategories(fallbackCategories);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const display = categories.length > 0 ? categories : fallbackCategories;

  return (
    <main className="pt-24 pb-20 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20"></div>

      <section className="container mx-auto px-6 relative z-10 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tighter leading-none mb-4">
            CHOOSE YOUR <span className="text-primary neon-text-pink">BATTLEGROUND</span>
          </h1>
          <p className="text-on-surface-variant font-body text-lg leading-relaxed max-w-xl">
            From the rain-slicked streets of a dystopian future to the precision of a high-stakes heist. Filter the universe by your preferred adrenaline profile.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {display.map((cat, i: number) => {
            const isLarge = i === 0;
            const isWide = i === 3;
            const heights = isLarge ? 'h-[400px] md:h-auto md:col-span-2 md:row-span-2' : isWide ? 'h-[250px] md:col-span-2' : 'h-[300px]';
            const genreMap: Record<string, string> = {
              'High-Octane': 'Action',
              'Martial Arts': 'Action',
              'Cyberpunk': 'Sci-Fi',
              'Heist': 'Thriller',
              'Revenge': 'Action',
              'Superhuman': 'Sci-Fi',
            };
            return (
              <Link key={cat.id || i} href={`/pencarian?genre=${genreMap[cat.name] || cat.name || 'Action'}`} className={`${heights} category-card group cursor-pointer relative overflow-hidden rounded-xl`}>
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={cat.name} src={
                  i === 0 ? 'https://img.youtube.com/vi/nkCXmkCmjzA/maxresdefault.jpg' :
                  i === 1 ? 'https://img.youtube.com/vi/SE-AhAm_EBk/maxresdefault.jpg' :
                  i === 2 ? 'https://img.youtube.com/vi/xghsjPvOjZA/maxresdefault.jpg' :
                  i === 3 ? 'https://img.youtube.com/vi/jcAF3yDTVYs/maxresdefault.jpg' :
                  i === 4 ? 'https://img.youtube.com/vi/cSIsQSnteX4/maxresdefault.jpg' :
                  'https://img.youtube.com/vi/JDcl3UtX9fQ/maxresdefault.jpg'
                } />
                <div className="absolute inset-0 bg-surface-dim/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
                <div className={`absolute inset-0 border ${cat.color === 'secondary' ? 'border-secondary/30 group-hover:border-secondary' : 'border-primary/30 group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(255,45,120,0.4)]'} rounded-xl transition-all duration-300`}></div>
                <div className={`absolute bottom-0 ${isLarge || isWide ? 'p-8' : 'p-6'} w-full`}>
                  {cat.tag && (
                    <span className={`font-label ${cat.color === 'secondary' ? 'text-secondary' : cat.color === 'tertiary' ? 'text-tertiary' : 'text-primary'} text-xs font-bold uppercase tracking-[0.2em] block mb-1`}>
                      {cat.tag || cat.color}
                    </span>
                  )}
                  <h3 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-headline font-bold text-on-surface tracking-tight`}>{cat.name}</h3>
                  {cat.description && <p className="text-on-surface-variant text-sm mt-2 max-w-sm">{cat.description}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="bg-surface-container/50 border border-secondary/20 rounded-2xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 backdrop-blur-sm">
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-secondary neon-text-cyan mb-2">1,240+</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Live Missions</span>
          </div>
          <div className="w-px h-12 bg-secondary/20 hidden md:block"></div>
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-primary neon-text-pink mb-2">48</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Sub-Genres</span>
          </div>
          <div className="w-px h-12 bg-secondary/20 hidden md:block"></div>
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-tertiary mb-2">24/7</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Active Stream</span>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-secondary/20">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-lg font-black font-headline text-primary">NEON-ACTION</span>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-tighter">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/pencarian?genre=Action">Cyber-Action</Link>
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/pencarian?genre=Sci-Fi">High-Octane</Link>
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/kategori">Student Forums</Link>
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/pencarian">Global Leaderboard</Link>
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/about">Support</Link>
          <Link className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="/about">Legal</Link>
        </nav>
        <div className="flex gap-4">
          <Link className="w-8 h-8 flex items-center justify-center rounded border border-secondary/30 hover:border-secondary transition-all" href="/pencarian">
            <span className="material-symbols-outlined text-secondary text-sm">terminal</span>
          </Link>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'NEON-ACTION Categories', url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied!');
              }
            }}
            className="w-8 h-8 flex items-center justify-center rounded border border-secondary/30 hover:border-secondary transition-all"
          >
            <span className="material-symbols-outlined text-secondary text-sm">public</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
