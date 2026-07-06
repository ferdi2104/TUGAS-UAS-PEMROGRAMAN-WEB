'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const fallbackTrending = [
  { title: 'Circuit Breaker', match: '98%', tags: ['4K', 'Action'], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34hdsZ7WlqMt5gi2k57X5JaGfLoCGlbeB2hnOUZPNaQLoAZKzlAFLfpJHF3PHx_3rROHb9KzBCICibYEU0kBQ6rDAjPSJm_fqmdmLNzvrlkPU2DzKrqFgXy6JCR6x2dov1hMXnfEzbC9XpOYOa8azVTofXp53yhIHVbP3ZtzPm5-uQcsnK4ODt1adNUDY5r389AnkAD2SCfhAGtiUqP5Z0xDOW9Lsni0k_RL5OUvyTsWiYUxAXvCLpTf10qKxulPUycg9n8uRrlU', id: '1' },
  { title: 'Sector Silence', match: '94%', tags: ['HD', 'Sci-Fi'], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAueV56eM9h5b_MnpeCeF9acNCXNtfyffMKZB-0vUr9fSfjNF-tdB7n0qgO1PMyzzdHdw1zgyqs_PGWu-T6AWICLx687I7qsaIoYAtTQ1lGN_dcqxCMDjUGzmbwLzQnIXtwW_AKkTEF0W-b-tmuS8loD_n8PA83dxSYdHIYCAIdnsIu6ObnKu78CnuoXeLNC6oFdcle9NML7GMVgC4QFK-2VsXb0fp5k9fkLjWrPMjpsBEeadPFe91QNJfqGmvT9G5n0xpl5ZjCHtw', id: '2' },
  { title: 'Glitch Strike', match: '91%', tags: ['Action'], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk4TYfkmWBxaXPoKkYG_5nL1e-fh6s-3SchTMr7DqN0gnVCanmoXODO_XJjQ1NvMJ3qkAKYGeFcKwZgi5iO6oMux8R4WEhuc0DAzQsoPXPUx8aS_y-ECsr5d6yTViZmK5Xq9kfFG06ffaiazoQb6mTHaBnRhG66Y4nAK6yghaQf6y5WR_1PEZUKUNInr1PK_9AYnN1G2ZbLPulfdQRSgM3QDCnyf98cG7CnZdY2kUIpJNOqEzGgU082F-BFnuypAFxGP7bAarCDKU', id: '3' },
  { title: 'The Uplink', match: '89%', tags: ['Thriller'], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDefz6F5XgZFkzQYY6GedMZz3qBsEE-4MZMEDT-403AH11pcac1mMugQy1Ko-qvG3003Q_eLgaLdte3t9G7YW6r-IMDMITAMWQblNNDhcX533q3ZpCbheQBLa49HpOqiO1uG7NxSikJjiLnVrrlp9A4G3Ruf43VQZtMFIJC-hN6nmKvTuQEX1H1UsZWw1lWeeYVb0opkJRAfwZcYBIOWC8tyK0YVhSsZS1EtKhLEZKoQTUMGH79Y9j52HAo7KfKkkuhkYRdB5QE108', id: '4' },
  { title: 'Velocity Prime', match: '87%', tags: ['Action'], img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH8QHCHuTyQQ7GE3qNfk-PqjJ4uojN0AfKgZAMmO4W-AiLoodpApAhX9WY2iw3CgLfeShH0xwhkx9xUDUGjnof-lMkKQm9QzhWMvewxOhpa6sYcvkZhZBO4XEOSGansmJSi_9oyjYKOTxZ6EtLcFmezmag5hY5iYLIJCcdY_XXS9noKLTf7vqIgZOzO_TfkedNsC5zif1Gtean-ng_2598SorheAYyMfMgwZSb_cSx_-dHH7WwxZo_QrhQmfTUJngYzTNIeTR9EP0', id: '5' },
];

const fallbackCategories = [
  { icon: 'directions_car', label: 'High-Speed', color: 'secondary' },
  { icon: 'swords', label: 'Samurai-Punk', color: 'primary' },
  { icon: 'explosion', label: 'Explosive', color: 'tertiary' },
  { icon: 'rocket_launch', label: 'Deep Space', color: 'secondary' },
  { icon: 'precision_manufacturing', label: 'Cyber-Mech', color: 'primary' },
  { icon: 'terminal', label: 'Hacker-Thrill', color: 'tertiary' },
];

export default function HomePage() {
  const [trending, setTrending] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

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
      <section className="relative h-[870px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <img className="w-full h-full object-cover scale-105" alt="Cinematic cyberpunk city" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqebPZKNupem9YckkgsWR1t1ke98XXnVtxyscYWxJasM8WPe-fl4owRHV9BHaB7CvL-UrHz0Xzo98hiLu8-lR0D9g4AUw81RTkyPpWwalYiTrIXCrbP0O5RXSeRn9_r958cXJ2joQjZVzdVH1500ytvRX97Zowi8zrygaDRuVOfw2BY5py18TQ-xUZXefm34-yXrtnp5ELGiJDj8UX9EHnpOmT3AMxzitHPRfug9LAiHZHC-cPNvPhsLNbK0Ypn7wyhZKHyopEMNA" />
        </div>
        <div className="relative z-20 px-6 lg:px-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-3 py-1 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-label text-primary uppercase tracking-widest font-bold">Featured Student Pick</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter mb-4 leading-tight">
            NEON <span className="text-secondary drop-shadow-[0_0_12px_rgba(0,255,204,0.6)]">VENDETTA</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-8 leading-relaxed font-body">
            In the heart of Sector 7, a rogue courier must outrun a corporate death squad through the vertical slums of Neo-Tokyo. High-octane action meets raw synth-wave aesthetics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/detail">
              <button className="bg-primary text-on-primary font-bold font-label px-8 py-4 flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] active:scale-95 group">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                WATCH FREE
              </button>
            </Link>
            <button className="bg-surface-container-highest/60 backdrop-blur-md border border-outline/30 text-on-surface font-bold font-label px-8 py-4 flex items-center gap-3 transition-all hover:bg-surface-container-highest active:scale-95">
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
      <section className="py-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none"></div>
        <div className="flex justify-between items-end mb-8 relative z-10">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight text-white mb-2">Trending Now</h2>
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
          <Link className="text-secondary font-label text-sm flex items-center gap-2 hover:underline" href="/pencarian">
            EXPLORE ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
          {displayTrending.slice(0, 5).map((movie: any, i: number) => (
            <Link key={i} href={`/detail?id=${movie.id}`} className="group relative aspect-[2/3] bg-surface-container rounded-lg overflow-hidden border border-white/5 transition-all hover:border-primary/50 hover:-translate-y-2 cursor-pointer">
              <img className="w-full h-full object-cover" alt={movie.title} src={movie.img || movie.imageUrl} />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-primary font-bold text-sm mb-1">{movie.rating || movie.match} Match</span>
                <h3 className="font-headline font-bold text-lg leading-tight">{movie.title}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded uppercase font-label">{movie.genre || (movie.tags?.[0]) || 'Action'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Free for Students */}
      <section className="py-16 px-6 lg:px-12 bg-surface-container-low/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black font-headline tracking-tighter mb-4 uppercase inline-block border-b-4 border-secondary">Free for Students</h2>
            <p className="text-on-surface-variant font-body">Exclusive access verified through your university portal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-xl border border-secondary/30 bg-surface-container flex flex-col justify-end p-8 transition-all hover:shadow-[0_0_30px_rgba(0,255,204,0.1)]">
              <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Orbital station" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn2bMS6xiz9ElVmbARrNpB9ixSs7ZDmKAnRSHuQhWv8FcZkcBz0JVcNN0HBK_zrWwUzzcvkUZXbKEN3YDp3UAlCYCdtBNco5Ve8F47WCBXi7RmkM4z8BEMHMBZoGXT8qRnTw2jHtxlOBCJOrdUdE9Ujk8uSi0QwYGFs-Vq3KwmAftS86EiGN6ZhAsyt6vMl0zKyYGFL_kB-fEXHny13ohfac78Q5RQ73xaJvIQlrSo6er8k29uJeqHa5HtI7G0iHKm5LNZusACL_w" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-label text-sm font-bold uppercase tracking-widest">Premium Student Access</span>
                </div>
                <h3 className="text-4xl font-black font-headline mb-4">ORBITAL ZERO</h3>
                <Link href="/detail">
                  <button className="bg-secondary text-on-secondary font-bold font-label px-6 py-3 transition-all hover:scale-105 active:scale-95">START STREAMING</button>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface-container p-6 transition-all hover:border-primary/50">
              <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Mech" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9RGh1_0PdjgVPLPkcxIwUezSN2V7gTJcw-NuyO87k7xP6hqFPguZYSZkiYgfVK1RDsS5_ihAWBy2OfZYzZATPoLTXLe3V9ecCXQx5kM36BWbpaiEkLWArHRIcdQVBMbc4N8UR1dQMCUk90djeDM8Q9RW0_HeQEoOdDgyiWmhq57MDHecHsHNCdcW65He6ORn9aEaebXshjxxC3M4JqBFEJXUgdEIDO9cjQRPIx-8ZwVuejejRr8LbT5DabVcrB9Bo2Ou9-xPsw28" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h4 className="font-headline font-bold text-xl mb-1">Mech Warriors</h4>
                <p className="text-xs text-on-surface-variant font-label uppercase">Weekly Student Release</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface-container p-6 transition-all hover:border-tertiary/50">
              <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Hacker" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwGBrIi84RytaP612f3szTvKZpaXWVytjQ3vGOtXUwZQm8XDyF4NpeoQhEsIcAwinvjp4WVTVlvm6SJPQip-YOybQ_dHeWV9PazBhGbW5u4m_aiTgbpPHfjUN39S6yrG76OX6onUTSFSRlINfhcGlrxpDnJAbD5AYfc--DlHQVExXMWaJIemVrrlINrG9BBTztRjoSxcCG_TnTxUXOu2xcNUeE17j462Kfwza3iSxwSJUn8TdbPOGA24Xcul3RdMmxvsF21Edus4" />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h4 className="font-headline font-bold text-xl mb-1">The Firewall</h4>
                <p className="text-xs text-on-surface-variant font-label uppercase">Unlocked: 1080p</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Sub-genres */}
      <section className="py-16 px-6 lg:px-12 bg-background">
        <h2 className="text-2xl font-bold font-headline mb-8 flex items-center gap-4">
          <span className="w-1 h-8 bg-tertiary"></span>
          Action Sub-genres
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCategories.map((item: any, i: number) => (
            <Link key={i} href="/kategori" className="group relative py-12 flex flex-col items-center justify-center bg-surface-container rounded-lg border border-white/5 hover:bg-surface-variant transition-all hover:border-secondary/50">
              <span className="material-symbols-outlined text-4xl mb-4 group-hover:text-secondary group-hover:scale-110 transition-all">{item.icon}</span>
              <span className="font-label text-xs uppercase tracking-widest font-bold">{item.name || item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-surface-container/60 backdrop-blur-xl p-12 rounded-2xl border border-primary/20 neon-border-pink">
          <h2 className="text-4xl font-headline font-black mb-4">JOIN THE ACTION REVOLUTION</h2>
          <p className="text-on-surface-variant mb-8 text-lg">Subscribe to get notified about the latest student drops and exclusive midnight releases.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input className="flex-grow bg-background border-outline/50 focus:border-primary focus:ring-1 focus:ring-primary rounded px-4 py-3 font-body text-on-surface" placeholder="student@university.edu" type="email" />
            <button className="bg-primary text-on-primary font-black font-label px-8 py-3 transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.6)] active:scale-95">JOIN NOW</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-secondary/20">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-lg font-black font-headline text-primary">NEON-ACTION UNIVERSE</div>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-tighter">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {['Cyber-Action', 'High-Octane', 'Student Forums', 'Global Leaderboard', 'Support', 'Legal'].map((item, i) => (
            <a key={i} className="text-on-surface-variant hover:text-tertiary transition-colors hover:translate-x-1 duration-200 text-sm font-label uppercase tracking-widest" href="#">{item}</a>
          ))}
        </div>
        <div className="flex gap-4">
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant hover:bg-primary transition-all duration-300" href="#">
            <span className="material-symbols-outlined text-white">share</span>
          </a>
          <a className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-variant hover:bg-secondary transition-all duration-300" href="#">
            <span className="material-symbols-outlined text-white">groups</span>
          </a>
        </div>
      </footer>

      {/* BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-md border-t border-primary/20 h-16 flex items-center justify-around z-50">
        <button className="flex flex-col items-center gap-1 text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>movie</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Movies</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">tv_gen</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Series</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Live</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">school</span>
          <span className="text-[10px] font-label font-bold uppercase tracking-widest">Perks</span>
        </button>
      </nav>
    </main>
  );
}
