'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const fallbackMovies = [
  { id: '1', title: 'DIGITAL HAVOC', year: 2024, runtime: '124 MIN', rating: 8.9, description: 'In the year 2099, a rogue AI takes control of the city\'s power grid.', genre: 'Action', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlz9aiMyCvD2uIKmJNtqjy-mDS1VeJuhfpgR3zrqLKCaxiTk8MUBgrU9W4wm9uExaX3Sfi6EDQ37QhzpaxMnge5qX2u9zyD2Dqob4KYMCz8a16hFklDtmpGeGiSdwT_yHBh1y8YUjZs_MF3JlZ_VANEqB5GFWJtwMq4k4khPDMFlBw_W0FJuFeSoryzAhgrRP8lwM8J1xBzH5Xfv2Wx2gawsV0ORKkB2blJTkdmJ1BzXCrxGOH6NzQoLwz5bAKyrSyf3nCfqsCtdg', tag: 'HOT' },
  { id: '2', title: 'VELOCITY PROTOCOL', year: 2023, runtime: '108 MIN', rating: 9.2, description: 'Illegal hover-racing in the stratosphere. High stakes, zero gravity.', genre: 'Sci-Fi', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA71gWcC87GaanXTDGBuoKnpxxCKkWoPPxG1bAihfDlSN826NaqizbUxJJVOXdXbeYVxyaLDbZGQMYIMz0dZWzbiAtQFbNep-NfmrP3lCbkrFOoX01isXPq8pcSlUj7ffMyYEmj8a2WBeoW3emY4vKz_DoNFO6Wb2RtAVMGbeotYSgta8uD-b3db_YNPkmyTWQPNKSEef0Kho1pff8labhHUZ7afvZkzvi0MebujBCdsyC0uEKxCQ032rQxwnTl1qfh-geH27Im9OE' },
  { id: '3', title: 'CIRCUIT BREAKER', year: 2024, runtime: '115 MIN', rating: 8.5, description: 'Cyber-enhanced martial arts in the lawless sectors of District 9.', genre: 'Action', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwC1m6uXiwSbU4-2ugKku1ls0To6_ZvnIEg3TbkeRaxRi5G4zlEaL6ErZ9XXhDNrzz8nGYLrJ6mzYv9oOp_KV1D-b1-Q4mKDUea02szMOQ1DruqCyShGJGuxmsS8Q54lVEr0Y1EM2v4-rKceIT9T3vKZHzRwqwUFNhYJHesCQPEYwAXiAM5ENgLDA6zFFtwQ1sFEOtCgNoBa9hx0RLlfETy-3EzVAq-nxCTONFJ81EpLV8V2J5MF6cgbEf3wwQDMJwvPNDFLonz3M' },
  { id: '4', title: 'NEON SYNDICATE', year: 2022, runtime: '142 MIN', rating: 8.1, description: 'Power struggles within the city\'s largest tech conglomerate.', genre: 'Thriller', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjWM2hqanHVEmHtovHcSt2wq-Wgkl8dkHjpfTjWx9WtjM51xsAtJesLFJah-DhicOZxJ38wy6pJl284OTZmpQctv7OVo6zDAndlGbh6merq-AAgsYW90MqP8mYZO8q8V-kIpt3xBg7Jnxm9Nquo5xEtX3gcZVjIkxBgOOFTCxxT0HajwgCB329GZ0yc9Evqpj2BDWVhFAcVATYM12ZHBTMZvkG737KDsb_Ksfj4FAxjwhsxcakD2PctkAiVfFwwj9bMACQ7lHDaJ4' },
  { id: '5', title: 'STATIC VOID', year: 2021, runtime: '95 MIN', rating: 7.8, description: 'Lost in the outer rim, a salvage crew discovers a derelict station.', genre: 'Sci-Fi', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc4yWtiyAKbrtHwbdlCpGAtPKQu96lY5b7nMGXW7UwDxVRWFQj7O-bdukDhd65IeTz3ufZXagV8OjeeHjL_6AMTZyVKfCxXFUGsb1gEBVfi0Wt5qszhFr4bO4UIg45a7usAjK_Hqlo6w7ikIRUyCDg2tI4W9NyqvvkGkCEYrjdX2_oGt0YMjcfYXSCCmQZ87fLzx2dphG4g3LMB_BP09WkyWqHU_SXUd-_20s0f_TbqPaKfMhz2FaPhuHWTI643Pi3txIxmmYJaCc' },
  { id: '6', title: 'ECHOES OF CHROME', year: 2024, runtime: '131 MIN', rating: 8.3, description: 'A detective investigates crimes committed by digital ghosts.', genre: 'Thriller', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5cFy8y8ALQM9DmVwnJgpwS0O-aCkKx-mbBsB7RR-L2O0V6loPbgi_e-3a-vJHDIDH_2bQRh2A18IYlY1dU62xBzKS_yuDjl7Zid52j9RiGzFUdPaMd2ktROuHkdJ7kyrJkMLJbnVG4lsqH6zlKPdFWcjEst2txtazrBsMEHQ7o7ddLKLuege3aK3eoYn8dlN3Q3GTPY9ldA3IDhCbwm3xFvoLwzEFjjihCJq55Rc55ANDJcaLeDab9-Ib6hGearUm943CvQKhq88' },
];

const allGenres = ['Action', 'Sci-Fi', 'Thriller', 'Horror', 'Comedy', 'Drama'];

function PencarianContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeGenre, setActiveGenre] = useState('');
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const limit = 12;

  const yearRanges = [
    { label: '2024 - Neo Era', value: '2024', filter: (y: number) => y >= 2024 },
    { label: '2020 - 2023', value: '2020-2023', filter: (y: number) => y >= 2020 && y <= 2023 },
    { label: 'Retro-Future (Pre-2020)', value: 'pre-2020', filter: (y: number) => y < 2020 },
  ];

  useEffect(() => {
    setPage(1);
  }, [searchInput, activeGenre, yearFilter]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchInput) params.set('search', searchInput);
        if (activeGenre) params.set('genre', activeGenre);
        params.set('page', String(page));
        params.set('limit', String(limit));

        if (yearFilter.length > 0) {
          const minYear = Math.min(...yearFilter.map(yf => {
            if (yf === '2024') return 2024;
            if (yf === '2020-2023') return 2020;
            if (yf === 'pre-2020') return 0;
            return 0;
          }));
          const maxYear = Math.max(...yearFilter.map(yf => {
            if (yf === '2024') return 9999;
            if (yf === '2020-2023') return 2023;
            if (yf === 'pre-2020') return 2019;
            return 9999;
          }));
          params.set('yearFrom', String(minYear));
          params.set('yearTo', String(maxYear));
        }

        const res = await fetch(`/api/movies?${params.toString()}`);
        if (res.ok) {
          const result = await res.json();
          const data = result.data || [];
          setMovies(data.length > 0 ? data : fallbackMovies);
          setTotal(result.total || 0);
        } else {
          setMovies(fallbackMovies);
          setTotal(fallbackMovies.length);
        }
      } catch {
        setMovies(fallbackMovies);
        setTotal(fallbackMovies.length);
      }
      setLoading(false);
    }
    fetchData();
  }, [page, searchInput, activeGenre, yearFilter]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const displayMovies = movies.length > 0 ? movies : fallbackMovies;

  const toggleYear = (value: string) => {
    setYearFilter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  if (loading) {
    return (
      <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 px-6 min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-8">
          <div className="bg-surface-container/50 backdrop-blur-sm p-6 neon-border-cyan rounded-lg">
            <h2 className="font-headline font-bold text-secondary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">filter_list</span>
              FILTERS
            </h2>

            {/* Search Input */}
            <div className="mb-6">
              <label className="font-label text-xs text-secondary-fixed-dim uppercase tracking-widest mb-3 block">Search</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                <input
                  className="w-full bg-surface-container-highest border border-outline/30 rounded-lg pl-9 pr-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all"
                  placeholder="Cari film..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>

            {/* Year Filter */}
            <div className="mb-8">
              <label className="font-label text-xs text-secondary-fixed-dim uppercase tracking-widest mb-4 block">Release Year</label>
              <div className="space-y-2">
                {yearRanges.map((yr) => (
                  <label key={yr.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="form-checkbox bg-surface-container-highest border-outline-variant text-secondary rounded-sm focus:ring-secondary/50"
                      type="checkbox"
                      checked={yearFilter.includes(yr.value)}
                      onChange={() => toggleYear(yr.value)}
                    />
                    <span className="text-sm font-body text-on-surface-variant group-hover:text-secondary transition-colors">{yr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-8">
              <label className="font-label text-xs text-secondary-fixed-dim uppercase tracking-widest mb-4 block">Genre</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveGenre('')}
                  className={`px-3 py-1 text-xs font-label transition-colors rounded-full ${
                    !activeGenre ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest border border-secondary/30 text-secondary hover:bg-secondary/10'
                  }`}
                >
                  All
                </button>
                {allGenres.map((g) => (
                  <button
                    key={g}
                    onClick={() => setActiveGenre(activeGenre === g ? '' : g)}
                    className={`px-3 py-1 text-xs font-label transition-colors rounded-full ${
                      activeGenre === g ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest border border-secondary/30 text-secondary hover:bg-secondary/10'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight mb-1">
                {searchInput ? (
                  <>SEARCH: <span className="text-secondary neon-text-cyan">"{searchInput}"</span></>
                ) : (
                  <>HIGH-OCTANE <span className="text-primary neon-text-pink">RESULTS</span></>
                )}
              </h1>
              <p className="text-sm font-label text-on-surface-variant uppercase tracking-widest">
                {total > 0 ? `${total} missions found in the archive` : `${displayMovies.length} missions shown`}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayMovies.map((movie: any, i: number) => (
              <Link key={movie.id || i} href={`/detail?id=${movie.id}`} className="group relative bg-surface-container rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,45,120,0.15)] neon-border-pink border-opacity-0 hover:border-opacity-100">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={movie.title} src={movie.imageUrl} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                  {movie.tag && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-tertiary text-on-tertiary font-label text-[10px] font-bold px-2 py-1 rounded">{movie.tag}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{movie.title}</h3>
                    <span className="font-label text-secondary text-sm">{movie.rating}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">{movie.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-label text-outline uppercase tracking-widest">{movie.year} &bull; {movie.runtime}</span>
                    <button className="flex items-center gap-1 text-primary text-xs font-bold font-label group-hover:translate-x-1 transition-transform">
                      INITIALIZE <span className="material-symbols-outlined text-sm">play_arrow</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded transition-all ${
                      page === pageNum
                        ? 'bg-primary text-on-primary font-label font-bold shadow-[0_0_12px_rgba(255,45,120,0.4)]'
                        : 'border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && page < totalPages - 2 && (
                <span className="text-on-surface-variant font-label px-1">...</span>
              )}
              {totalPages > 5 && page < totalPages - 2 && (
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-all"
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="w-10 h-10 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-secondary/20 mt-16">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-black font-headline text-primary">NEON-ACTION</span>
          <p className="text-xs font-label text-on-surface-variant tracking-widest uppercase">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {['Cyber-Action', 'High-Octane', 'Student Forums', 'Global Leaderboard', 'Support', 'Legal'].map((item, i) => (
            <a key={i} className="text-xs font-label text-on-surface-variant hover:text-tertiary hover:translate-x-1 transition-all duration-200" href="#">{item}</a>
          ))}
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">hub</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-secondary cursor-pointer transition-colors">terminal</span>
          <span className="material-symbols-outlined text-on-surface-variant hover:text-tertiary cursor-pointer transition-colors">rss_feed</span>
        </div>
      </footer>

      <div className="scanline-overlay fixed inset-0 opacity-10 pointer-events-none z-[100]" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px' }}></div>
    </main>
  );
}

export default function PencarianPage() {
  return (
    <Suspense fallback={
      <main className="pt-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    }>
      <PencarianContent />
    </Suspense>
  );
}
