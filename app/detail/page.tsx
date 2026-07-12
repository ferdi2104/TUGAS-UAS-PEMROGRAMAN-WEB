'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Movie, Comment } from '@lib/types';
import Footer from '@components/Footer';

const fallbackMovie: Movie = {
  id: '1',
  title: 'Jackie Chan: International Justice',
  description: 'Jackie Chan and a female assassin team up to take down international crime syndicates in this action-packed blockbuster.',
  year: 2024,
  runtime: '120 Mins',
  rating: 8.5,
  genre: 'Action',
  subgenre: null,
  imageUrl: 'https://img.youtube.com/vi/xghsjPvOjZA/maxresdefault.jpg',
  videoUrl: 'https://www.youtube.com/watch?v=xghsjPvOjZA',
  tag: 'Featured',
  featured: true,
};

function DetailContent() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get('id');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [related, setRelated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentUsername, setCommentUsername] = useState('');
  const [posting, setPosting] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [likedComments, setLikedComments] = useState<string[]>([]);

  useEffect(() => {
    const savedUsername = localStorage.getItem('commentUsername');
    if (savedUsername) setCommentUsername(savedUsername);
    const liked = JSON.parse(localStorage.getItem('likedComments') || '[]') as string[];
    setLikedComments(liked);
  }, []);

  useEffect(() => {
    if (!movie) return;
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]') as { id: string }[];
    setIsInWatchlist(watchlist.some((m) => m.id === movie.id));
  }, [movie]);

  useEffect(() => {
    if (!movie) return;
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]') as { id: string; title: string; imageUrl: string; rating: number; genre: string }[];
    if (!history.some((m) => m.id === movie.id)) {
      history.unshift({ id: movie.id, title: movie.title, imageUrl: movie.imageUrl, rating: movie.rating, genre: movie.genre });
      if (history.length > 20) history.pop();
      localStorage.setItem('watchHistory', JSON.stringify(history));

      const today = new Date().toDateString();
      const lastView = localStorage.getItem('lastViewDate');
      const streak = parseInt(localStorage.getItem('streakDays') || '0');
      if (lastView === today) {
        // already viewed today, no change
      } else if (lastView === new Date(Date.now() - 86400000).toDateString()) {
        localStorage.setItem('streakDays', String(streak + 1));
      } else {
        localStorage.setItem('streakDays', '1');
      }
      localStorage.setItem('lastViewDate', today);
    }
  }, [movie]);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = movieId || 'featured';
        const movieUrl = id === 'featured' ? '/api/movies?featured=true' : `/api/movies?id=${id}`;
        const movieRes = await fetch(movieUrl);

        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setMovie(movieData);

          const [commentsRes, allMoviesRes] = await Promise.all([
            fetch(`/api/comments?movieId=${movieData.id}`),
            fetch('/api/movies'),
          ]);

          if (commentsRes.ok) {
            const commentsData = await commentsRes.json();
            setComments(commentsData || []);
          }

          if (allMoviesRes.ok) {
            const allMovies = await allMoviesRes.json();
            const movieList = Array.isArray(allMovies) ? allMovies : (allMovies.data || []);
            setRelated(movieList.filter((m: Movie) => m.id !== movieData.id).slice(0, 3));
          }
        } else {
          setMovie(fallbackMovie);
        }
      } catch {
        setMovie(fallbackMovie);
      }
      setLoading(false);
    }
    fetchData();
  }, [movieId]);

  const postComment = async () => {
    if (!commentText.trim() || !commentUsername.trim() || !movie) return;
    setPosting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieId: movie.id,
          username: commentUsername.trim(),
          content: commentText.trim(),
        }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments(prev => [newComment, ...prev]);
        setCommentText('');
        localStorage.setItem('commentUsername', commentUsername.trim());
        const count = parseInt(localStorage.getItem('commentCount') || '0');
        localStorage.setItem('commentCount', String(count + 1));
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  const m = movie || fallbackMovie;

  function getEmbedUrl(url: string) {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : url;
  }

  return (
    <main className="pt-16 min-h-screen">
      <section className="relative w-full aspect-video md:h-[716px] bg-black overflow-hidden">
        {playing && m.videoUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={getEmbedUrl(m.videoUrl)}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {m.videoUrl && (
                <button onClick={() => setPlaying(true)} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary flex items-center justify-center text-primary hover:scale-110 transition-transform active:scale-95 hover:shadow-[0_0_30px_rgba(255,45,120,0.6)] group">
                  <span className="material-symbols-outlined text-4xl sm:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              )}
            </div>
            <div className="w-full h-full bg-surface-dim relative">
              <div className="absolute inset-0 scanline opacity-30"></div>
              <img className="w-full h-full object-cover opacity-60" alt={m.title} src={m.imageUrl} />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-12 z-20">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="bg-primary text-on-primary px-2 sm:px-3 py-0.5 font-label text-[10px] sm:text-xs font-bold tracking-tighter uppercase">{m.tag || 'Premium Action'}</span>
                <span className="bg-surface-container-highest text-secondary border border-secondary/30 px-2 sm:px-3 py-0.5 font-label text-[10px] sm:text-xs uppercase tracking-tighter">4K Ultra HD</span>
                <span className="text-tertiary flex items-center gap-1 font-label text-xs sm:text-sm">
                  <span className="material-symbols-outlined text-xs sm:text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {m.rating} Rating
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-headline text-on-surface mb-3 sm:mb-4 tracking-tighter drop-shadow-2xl">{m.title}</h1>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {m.videoUrl ? (
                  <button onClick={() => setPlaying(true)} className="bg-primary hover:bg-primary-container text-on-primary font-label px-4 sm:px-8 py-2.5 sm:py-3 font-bold flex items-center gap-2 transition-all text-sm sm:text-base">
                    <span className="material-symbols-outlined">play_circle</span> WATCH NOW
                  </button>
                ) : (
                  <button className="bg-primary/40 text-on-primary font-label px-4 sm:px-8 py-2.5 sm:py-3 font-bold flex items-center gap-2 transition-all cursor-not-allowed text-sm sm:text-base">
                    <span className="material-symbols-outlined">play_circle</span> NO VIDEO
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!movie) return;
                    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]') as { id: string; title: string; imageUrl: string; rating: number; genre: string }[];
                    if (isInWatchlist) {
                      const updated = watchlist.filter((item) => item.id !== movie.id);
                      localStorage.setItem('watchlist', JSON.stringify(updated));
                      setIsInWatchlist(false);
                      const wlCount = parseInt(localStorage.getItem('watchlistCount') || '0');
                      localStorage.setItem('watchlistCount', String(Math.max(0, wlCount - 1)));
                    } else {
                      watchlist.push({ id: movie.id, title: movie.title, imageUrl: movie.imageUrl, rating: movie.rating, genre: movie.genre });
                      localStorage.setItem('watchlist', JSON.stringify(watchlist));
                      setIsInWatchlist(true);
                      const wlCount = parseInt(localStorage.getItem('watchlistCount') || '0');
                      localStorage.setItem('watchlistCount', String(wlCount + 1));
                    }
                  }}
                  className={`backdrop-blur-md border font-label px-4 sm:px-8 py-2.5 sm:py-3 font-bold flex items-center gap-2 transition-all text-sm sm:text-base ${
                    isInWatchlist
                      ? 'bg-secondary/20 border-secondary text-secondary hover:bg-secondary hover:text-on-secondary'
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined">{isInWatchlist ? 'bookmark' : 'add'}</span> {isInWatchlist ? 'IN MY LIST' : 'MY LIST'}
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        <div className="lg:col-span-2 space-y-8 sm:space-y-12">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-secondary mb-4 uppercase tracking-tight flex items-center gap-2">
              <span className="w-6 sm:w-8 h-[2px] bg-secondary"></span> Synopsis
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-base sm:text-lg font-body">{m.description}</p>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-surface-container rounded border-l-2 border-primary">
                <span className="block text-[10px] sm:text-xs font-label text-on-surface-variant uppercase mb-1">Tag</span>
                <span className="text-on-surface font-semibold text-sm">{m.tag || m.genre || 'Action'}</span>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container rounded border-l-2 border-secondary">
                <span className="block text-[10px] sm:text-xs font-label text-on-surface-variant uppercase mb-1">Runtime</span>
                <span className="text-on-surface font-semibold text-sm">{m.runtime}</span>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container rounded border-l-2 border-tertiary">
                <span className="block text-[10px] sm:text-xs font-label text-on-surface-variant uppercase mb-1">Genre</span>
                <span className="text-on-surface font-semibold text-sm">{m.genre}</span>
              </div>
              <div className="p-3 sm:p-4 bg-surface-container rounded border-l-2 border-white">
                <span className="block text-[10px] sm:text-xs font-label text-on-surface-variant uppercase mb-1">Released</span>
                <span className="text-on-surface font-semibold text-sm">{m.year}</span>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-outline-variant pb-4">
              <h2 className="text-xl sm:text-2xl font-bold font-headline text-primary uppercase tracking-tight">Student Intel</h2>
              <span className="text-on-surface-variant font-label text-xs sm:text-sm uppercase">{comments.length || 0} Comments</span>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div id="comment-form" className="bg-surface-container-high p-3 sm:p-4 rounded-xl border border-outline-variant focus-within:border-primary/50 transition-colors">
                <input
                  className="w-full bg-transparent border-b border-outline/20 focus:border-secondary/50 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 pb-2 mb-3 text-sm"
                  placeholder="Your callsign..."
                  value={commentUsername}
                  onChange={(e) => setCommentUsername(e.target.value)}
                />
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 resize-none min-h-[5rem]"
                  placeholder="Upload your tactical review..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={postComment}
                    disabled={posting || !commentText.trim() || !commentUsername.trim()}
                    className="bg-primary/20 text-primary border border-primary/40 px-4 sm:px-6 py-2 font-label text-xs sm:text-sm font-bold hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {posting ? 'POSTING...' : 'Post Comment'}
                  </button>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {comments.length > 0 ? comments.map((comment, i: number) => (
                  <div key={comment.id || i} className="flex gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-secondary shrink-0 overflow-hidden bg-surface-variant flex items-center justify-center font-label text-xs text-secondary">
                      {comment.username?.charAt(0) || 'U'}
                    </div>
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="font-label font-bold text-secondary text-sm">{comment.username}</span>
                        <span className="text-[10px] sm:text-xs text-on-surface-variant uppercase">{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-on-surface-variant text-xs sm:text-sm">{comment.content}</p>
                      <div className="flex items-center gap-3 sm:gap-4 text-on-surface-variant">
                        <button
                          onClick={() => {
                            if (likedComments.includes(comment.id)) return;
                            const updated = [...likedComments, comment.id];
                            setLikedComments(updated);
                            localStorage.setItem('likedComments', JSON.stringify(updated));
                          }}
                          className={`flex items-center gap-1 text-xs transition-colors ${likedComments.includes(comment.id) ? 'text-primary' : 'hover:text-primary'}`}
                        >
                          <span className="material-symbols-outlined text-sm" style={likedComments.includes(comment.id) ? { fontVariationSettings: "'FILL' 1" } : undefined}>thumb_up</span> {comment.likes || 0}
                        </button>
                        <button
                          onClick={() => {
                            setCommentText(`@${comment.username} `);
                            document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="flex items-center gap-1 text-xs hover:text-secondary transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">reply</span> Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-on-surface-variant text-center py-6 sm:py-8 font-label text-sm">No intel yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-headline text-tertiary uppercase tracking-tight">Related Action</h2>
            <Link className="text-[10px] sm:text-xs font-label text-on-surface-variant hover:text-secondary uppercase underline underline-offset-4" href="/pencarian">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {(related.length > 0 ? related : []).map((movie, i: number) => (
              <Link key={movie.id || i} href={`/detail?id=${movie.id}`} className="group relative bg-surface-container rounded overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer">
                <div className="aspect-video w-full relative">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={movie.title} src={movie.imageUrl} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  {movie.tag && (
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-secondary text-on-secondary px-2 py-0.5 text-[10px] font-label font-bold uppercase">{movie.tag}</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-headline font-bold text-xs sm:text-sm text-on-surface group-hover:text-secondary transition-colors truncate">{movie.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] sm:text-xs text-on-surface-variant font-label uppercase">{movie.year} &bull; {movie.runtime}</span>
                    <span className="text-tertiary text-[10px] sm:text-xs font-bold font-label">{movie.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="neon-border-pink p-4 sm:p-6 rounded relative overflow-hidden bg-surface-container-highest">
            <div className="relative z-10">
              <span className="text-tertiary font-label text-[10px] uppercase font-bold tracking-[0.2em] block mb-2">Exclusive Student Offer</span>
              <h4 className="text-base sm:text-xl font-headline font-extrabold text-on-surface leading-none mb-3 sm:mb-4">UNLOCK THE <span className="text-primary">ULTRA-PASS</span></h4>
              <p className="text-[10px] sm:text-xs text-on-surface-variant mb-4 sm:mb-6 leading-relaxed">Join the global elite. Get access to pre-release screenings, physical action figures, and hidden lore content.</p>
              <button
                onClick={() => {
                  alert('Coming Soon! Upgrade ke Ultra-Pass akan segera tersedia.');
                }}
                className="w-full py-2.5 sm:py-3 bg-primary/10 border border-primary text-primary font-label font-bold text-xs sm:text-sm hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest"
              >
                Upgrade Now
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 blur-[60px] rounded-full"></div>
          </div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={
      <main className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    }>
      <DetailContent />
    </Suspense>
  );
}
