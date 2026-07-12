'use client';

import Link from 'next/link';

interface FooterProps {
  paddingBottom?: boolean;
}

export default function Footer({ paddingBottom = false }: FooterProps) {
  return (
    <footer className={`w-full py-8 sm:py-12 px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 bg-surface-container-lowest border-t border-secondary/20 ${paddingBottom ? 'pb-24 md:pb-8' : ''}`}>
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-lg font-black font-headline text-primary">NEON-ACTION UNIVERSE</div>
        <p className="text-on-surface-variant text-sm font-label uppercase tracking-tighter">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/pencarian?genre=Action">Cyber-Action</Link>
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/pencarian?genre=Sci-Fi">High-Octane</Link>
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/kategori">Student Forums</Link>
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/pencarian">Global Leaderboard</Link>
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/about">Support</Link>
        <Link className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-xs sm:text-sm font-label uppercase tracking-widest" href="/about">Legal</Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'NEON-ACTION CINEMA', url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant hover:bg-primary transition-all duration-300"
        >
          <span className="material-symbols-outlined text-white">share</span>
        </button>
        <Link className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant hover:bg-secondary transition-all duration-300" href="/kategori">
          <span className="material-symbols-outlined text-white">groups</span>
        </Link>
      </div>
    </footer>
  );
}
