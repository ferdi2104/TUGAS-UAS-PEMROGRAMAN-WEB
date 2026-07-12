'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Movie, Category } from '@lib/types';

const fallbackTrending = [
  { title: 'Jackie Chan: International Justice', match: '85%', tags: ['Action'], img: 'https://img.youtube.com/vi/xghsjPvOjZA/maxresdefault.jpg', id: '1', rating: 8.5, genre: 'Action', imageUrl: 'https://img.youtube.com/vi/xghsjPvOjZA/maxresdefault.jpg' },
  { title: 'Silent Zone', match: '78%', tags: ['Horror'], img: 'https://img.youtube.com/vi/xnSXtIqSW3c/maxresdefault.jpg', id: '2', rating: 7.8, genre: 'Horror', imageUrl: 'https://img.youtube.com/vi/xnSXtIqSW3c/maxresdefault.jpg' },
  { title: 'Donnie Yen: Brutal Revenge', match: '87%', tags: ['Action'], img: 'https://img.youtube.com/vi/SE-AhAm_EBk/maxresdefault.jpg', id: '3', rating: 8.7, genre: 'Action', imageUrl: 'https://img.youtube.com/vi/SE-AhAm_EBk/maxresdefault.jpg' },
  { title: 'Shadow Swordsman', match: '82%', tags: ['Action'], img: 'https://img.youtube.com/vi/cSIsQSnteX4/maxresdefault.jpg', id: '4', rating: 8.2, genre: 'Action', imageUrl: 'https://img.youtube.com/vi/cSIsQSnteX4/maxresdefault.jpg' },
  { title: 'Fast & Furious: Full Throttle', match: '90%', tags: ['Action'], img: 'https://img.youtube.com/vi/nkCXmkCmjzA/maxresdefault.jpg', id: '5', rating: 9.0, genre: 'Action', imageUrl: 'https://img.youtube.com/vi/nkCXmkCmjzA/maxresdefault.jpg' },
];

const fallbackCategories: Category[] = [
  { icon: 'directions_car', name: 'High-Speed', description: null, color: 'secondary', tag: 'Speed' },
  { icon: 'swords', name: 'Samurai-Punk', description: null, color: 'primary', tag: 'Combat' },
  { icon: 'explosion', name: 'Explosive', description: null, color: 'tertiary', tag: 'Action' },
  { icon: 'rocket_launch', name: 'Deep Space', description: null, color: 'secondary', tag: 'Sci-Fi' },
  { icon: 'precision_manufacturing', name: 'Cyber-Mech', description: null, color: 'primary', tag: 'Tech' },
  { icon: 'terminal', name: 'Hacker-Thrill', description: null, color: 'tertiary', tag: 'Thriller' },
];

export default function HomePage() {
  const pathname = usePathname();
  const [trending, setTrending] = useState<(Partial<Movie> & { title: string; id: string; rating: number; genre: string; imageUrl: string; match?: string; img?: string; tags?: string[] })[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchData() {
      try {
        const [trendingRes, catRes] = await Promise.all([
          fetch('/api/movies?trending=true'),
          fetch('/api/categories'),
        ]);

        if (trendingRes.ok) {
          const data = await trendingRes.json();
          if (data && data.length > 0) setTrending(data);
          else setTrending(fallbackTrending);
        } else {
          setTrending(fallbackTrending);
        }

        if (catRes.ok) {
          const data = await catRes.json();
          if (data && data.length > 0) setCategories(data);
          else setCategories(fallbackCategories);
        } else {
          setCategories(fallbackCategories);
        }
      } catch {
        setTrending(fallbackTrending);
        setCategories(fallbackCategories);
      }
      setLoaded(true);
    }
    fetchData();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    localStorage.setItem('newsletterEmail', newsletterEmail.trim());
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 3000);
  };

  if (!loaded) {
    return (
      <main className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant font-label">ACCESSING MAINFRAME...</p>
        </div>
      </main>
    );
  }

  const displayTrending = trending.length > 0 ? trending : fallbackTrending;
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:h-[870px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img className="w-full h-full object-cover scale-105" alt="Cinematic cyberpunk city" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqebPZKNupem9YckkgsWR1t1ke98XXnVtxyscYWxJasM8WPe-fl4owRHV9BHaB7CvL-UrHz0Xzo98hiLu8-lR0D9g4AUw81RTkyPpWwalYiTrIXCrbP0O5RXSeRn9_r958cXJ2joQjZVzdVH1500ytvRX97Zowi8zrygaDRuVOfw2BY5py18TQ-xUZXefm34-yXrtnp5ELGiJDj8UX9EHnpOmT3AMxzitHPRfug9LAiHZHC-cPNvPhsLNbK0Ypn7wyhZKHyopEMNA" />
        </div>
        <div className="relative z-20 px-4 sm:px-6 lg:px-12 max-w-4xl py-20">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-3 py-1 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-label text-primary uppercase tracking-widest font-bold">Featured Student Pick</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-headline tracking-tighter mb-4 leading-tight">
            NEON <span className="text-secondary drop-shadow-[0_0_12px_rgba(0,255,204,0.6)]">VENDETTA</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mb-8 leading-relaxed font-body">
            In the heart of Sector 7, a rogue courier must outrun a corporate death squad through the vertical slums of Neo-Tokyo. High-octane action meets raw synth-wave aesthetics.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link href="/detail">
              <button className="bg-primary text-on-primary font-bold font-label px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] active:scale-95 group text-sm sm:text-base">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                WATCH FREE
              </button>
            </Link>
            <button
              onClick={() => {
                const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
                const firstMovie = displayTrending[0];
                if (firstMovie) {
                  const exists = watchlist.find((m: { id: string }) => m.id === firstMovie.id);
                  if (!exists) {
                    watchlist.push({ id: firstMovie.id, title: firstMovie.title, imageUrl: firstMovie.imageUrl || firstMovie.img, rating: firstMovie.rating, genre: firstMovie.genre });
                    localStorage.setItem('watchlist', JSON.stringify(watchlist));
                    alert('Added to My List!');
                  } else {
                    alert('Already in My List!');
                  }
                }
              }}
              className="bg-surface-container-highest/60 backdrop-blur-md border border-outline/30 text-on-surface font-bold font-label px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all hover:bg-surface-container-highest active:scale-95 text-sm sm:text-base"
            >
              <span className="material-symbols-outlined">add</span>
              MY LIST
            </button>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 z-20 hidden lg:flex flex-col gap-4 text-right">
          <div className="font-label text-xs uppercase text-secondary tracking-widest">IMAX Enhanced</div>
          <div className="font-label text-xs uppercase text-on-surface-variant tracking-widest">Released: 2024</div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 sm:mb-8 relative z-10 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-headline tracking-tight text-white mb-2">Trending Now</h2>
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
          <Link className="text-secondary font-label text-sm flex items-center gap-2 hover:underline" href="/pencarian">
            EXPLORE ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 relative z-10">
          {displayTrending.slice(0, 5).map((movie, i: number) => (
            <Link key={i} href={`/detail?id=${movie.id}`} className="group relative aspect-[2/3] bg-surface-container rounded-lg overflow-hidden border border-white/5 transition-all hover:border-primary/50 hover:-translate-y-2 cursor-pointer">
              <img className="w-full h-full object-cover" alt={movie.title} src={movie.img || movie.imageUrl} />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4">
                <span className="text-primary font-bold text-xs sm:text-sm mb-1">{movie.rating || movie.match} Match</span>
                <h3 className="font-headline font-bold text-sm sm:text-lg leading-tight">{movie.title}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded uppercase font-label">{movie.genre || (movie.tags?.[0]) || 'Action'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free for Students */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-surface-container-low/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-black font-headline tracking-tighter mb-4 uppercase inline-block border-b-4 border-secondary">Free for Students</h2>
            <p className="text-on-surface-variant font-body text-sm sm:text-base">Exclusive access verified through your university portal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-xl border border-secondary/30 bg-surface-container flex flex-col justify-end p-6 sm:p-8 transition-all hover:shadow-[0_0_30px_rgba(0,255,204,0.1)]">
              <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Student plan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn2bMS6xiz9ElVmbARrNpB9ixSs7ZDmKAnRSHuQhWv8FcZkcBz0JVcNN0HBK_zrWwUzzcvkUZXbKEN3YDp3UAlCYCdtBNco5Ve8F47WCBXi7RmkM4z8BEMHMBZoGXT8qRnTw2jHtxlOBCJOrdUdE9Ujk8uSi0QwYGFs-Vq3KwmAftS86EiGN6ZhAsyt6vMl0zKyYGFL_kB-fEXHny13ohfac78Q5RQ73xaJvIQlrSo6er8k29uJeqHa5HtI7G0iHKm5LNZusACL_w" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="font-label text-sm font-bold uppercase tracking-widest">Student Free Tier</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-headline mb-2">GRATIS untuk Mahasiswa</h3>
                <p className="text-on-surface-variant mb-4 max-w-lg text-sm sm:text-base">Cukup verifikasi email .ac.id / .edu kamu dan nikmati streaming gratis tanpa iklan.</p>
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-secondary text-sm">check</span>
                    <span>720p HD</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-secondary text-sm">check</span>
                    <span>Bebas Iklan</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-secondary text-sm">check</span>
                    <span>10 Film/bulan</span>
                  </div>
                </div>
                <Link href="/profile">
                  <button className="bg-secondary text-on-secondary font-bold font-label px-5 sm:px-6 py-2.5 sm:py-3 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base">VERIFIKASI SEKARANG</button>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-surface-container border border-primary/20 p-5 sm:p-6 transition-all hover:border-primary/60 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-primary">leaderboard</span>
                </div>
                <h4 className="font-headline font-bold text-base sm:text-lg mb-1">University Rankings</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant">UMY, UGM, dan 20+ kampus lain bersaing di papan peringkat mingguan.</p>
              </div>
              <div className="mt-4 text-xs text-secondary font-label uppercase tracking-widest">Coming Soon</div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-surface-container border border-tertiary/20 p-5 sm:p-6 transition-all hover:border-tertiary/60 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-tertiary/20 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-tertiary">groups</span>
                </div>
                <h4 className="font-headline font-bold text-base sm:text-lg mb-1">Community Picks</h4>
                <p className="text-xs sm:text-sm text-on-surface-variant">Rekomendasi film dari sesama mahasiswa. Vote & request film favoritmu.</p>
              </div>
              <Link href="/kategori">
                <button className="mt-4 text-xs text-tertiary font-label uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Action Sub-genres */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-background">
        <h2 className="text-xl sm:text-2xl font-bold font-headline mb-6 sm:mb-8 flex items-center gap-4">
          <span className="w-1 h-6 sm:h-8 bg-tertiary"></span>
          Action Sub-genres
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayCategories.map((item, i: number) => (
            <Link key={i} href="/kategori" className="group relative py-6 sm:py-12 flex flex-col items-center justify-center bg-surface-container rounded-lg border border-white/5 hover:bg-surface-variant transition-all hover:border-secondary/50">
              <span className="material-symbols-outlined text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:text-secondary group-hover:scale-110 transition-all">{item.icon}</span>
              <span className="font-label text-[10px] sm:text-xs uppercase tracking-widest font-bold">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-surface-container/60 backdrop-blur-xl p-6 sm:p-12 rounded-2xl border border-primary/20 neon-border-pink">
          <h2 className="text-xl sm:text-4xl font-headline font-black mb-4">JOIN THE ACTION REVOLUTION</h2>
          <p className="text-on-surface-variant mb-6 sm:mb-8 text-sm sm:text-lg">Subscribe to get notified about the latest student drops and exclusive midnight releases.</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <input
              className="flex-grow bg-background border border-outline/50 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 font-body text-on-surface text-sm sm:text-base"
              placeholder="student@university.edu"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-primary text-on-primary font-black font-label px-6 sm:px-8 py-3 transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.6)] active:scale-95 text-sm sm:text-base">
              {newsletterStatus === 'success' ? 'SUBSCRIBED!' : 'JOIN NOW'}
            </button>
          </form>
          {newsletterStatus === 'success' && (
            <p className="text-secondary text-sm mt-4 font-label">You are now subscribed to the action revolution!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 sm:py-12 px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 bg-surface-container-lowest border-t border-secondary/20 pb-24 md:pb-8">
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

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-md border-t border-primary/20 h-16 flex items-center justify-around z-50 pb-safe">
        <Link href="/" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/' ? 'text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : undefined}>movie</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Movies</span>
        </Link>
        <Link href="/kategori" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/kategori' ? 'text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={pathname === '/kategori' ? { fontVariationSettings: "'FILL' 1" } : undefined}>tv_gen</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Categories</span>
        </Link>
        <Link href="/pencarian" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/pencarian' ? 'text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={pathname === '/pencarian' ? { fontVariationSettings: "'FILL' 1" } : undefined}>explore</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Search</span>
        </Link>
        <Link href="/profile" className={`flex flex-col items-center gap-1 transition-colors ${pathname === '/profile' ? 'text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={pathname === '/profile' ? { fontVariationSettings: "'FILL' 1" } : undefined}>school</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Profile</span>
        </Link>
      </nav>
    </main>
  );
}
