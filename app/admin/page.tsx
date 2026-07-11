'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@lib/auth-context';
import { createClient } from '@lib/supabase/client';

interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  runtime: string;
  rating: number;
  genre: string;
  subgenre: string | null;
  imageUrl: string;
  videoUrl: string | null;
  tag: string | null;
  featured: boolean;
}

const defaultForm = {
  title: '',
  description: '',
  year: new Date().getFullYear(),
  runtime: '120 Mins',
  rating: 7.0,
  genre: 'Action',
  subgenre: '',
  imageUrl: '',
  videoUrl: '',
  tag: '',
  featured: false,
};

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.access_token) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }
      fetch('/api/auth/check-admin', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
          setChecking(false);
        })
        .catch(() => {
          setIsAdmin(false);
          setChecking(false);
        });
    });
  }, [user, authLoading, router, supabase]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/movies');
      if (res.ok) {
        const result = await res.json();
        setMovies(result.data || result || []);
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAdmin) fetchMovies(); }, [isAdmin]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/movies?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: `"${title}" deleted successfully` });
        fetchMovies();
      } else {
        const err = await res.json();
        setMessage({ type: 'error', text: err.error || 'Failed to delete' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete';
      setMessage({ type: 'error', text: msg });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const body: Record<string, unknown> = {
        title: form.title,
        description: form.description,
        year: form.year,
        runtime: form.runtime,
        rating: form.rating,
        genre: form.genre,
        featured: form.featured,
      };
      if (form.subgenre) body.subgenre = form.subgenre;
      if (form.imageUrl) body.imageUrl = form.imageUrl;
      if (form.videoUrl) body.videoUrl = form.videoUrl;
      if (form.tag) body.tag = form.tag;

      const url = editingId ? `/api/movies?id=${editingId}` : '/api/movies';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: editingId ? 'Film berhasil diupdate!' : 'Film berhasil ditambahkan!' });
        setForm(defaultForm);
        setEditingId(null);
        fetchMovies();
      } else {
        const err = await res.json();
        setMessage({ type: 'error', text: err.error || 'Gagal menyimpan film' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan film';
      setMessage({ type: 'error', text: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (movie: Movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      year: movie.year,
      runtime: movie.runtime,
      rating: movie.rating,
      genre: movie.genre,
      subgenre: movie.subgenre || '',
      imageUrl: movie.imageUrl,
      videoUrl: movie.videoUrl || '',
      tag: movie.tag || '',
      featured: movie.featured || false,
    });
    setEditingId(movie.id);
    setMessage(null);
  };

  const handleCancelEdit = () => {
    setForm(defaultForm);
    setEditingId(null);
    setMessage(null);
  };

  const genres = ['Action', 'Horror', 'Sci-Fi', 'Thriller', 'Comedy', 'Drama', 'Crime'];

  if (authLoading || checking) {
    return (
      <main className="pt-24 pb-12 min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="pt-24 pb-12 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary mb-4 block">admin_panel_settings</span>
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">ACCESS DENIED</h1>
          <p className="text-on-surface-variant font-label text-sm mb-6">You don&apos;t have permission to access this page.</p>
          <Link href="/" className="bg-primary text-on-primary font-label font-bold px-6 py-3 inline-block hover:shadow-[0_0_20px_rgba(255,45,120,0.5)] transition-all">
            BACK TO HOME
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-12 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black font-headline text-on-surface">ADMIN PANEL</h1>
            <p className="text-on-surface-variant font-label text-sm">Add and manage movies</p>
          </div>
          <Link href="/">
            <button className="bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold px-4 py-2 text-sm transition-all hover:bg-surface-variant">
              BACK TO HOME
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Movie Form */}
          <div className="bg-surface-container rounded-xl border border-outline/10 p-6">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
              <span className={`material-symbols-outlined ${editingId ? 'text-tertiary' : 'text-secondary'}`}>
                {editingId ? 'edit' : 'add_circle'}
              </span>
              {editingId ? 'EDIT MOVIE' : 'ADD NEW MOVIE'}
            </h2>

            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm font-label ${
                message.type === 'success'
                  ? 'bg-secondary/10 text-secondary border border-secondary/30'
                  : 'bg-primary/10 text-primary border border-primary/30'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Title *</label>
                <input className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>

              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Description *</label>
                <textarea className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50 h-24" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Year</label>
                  <input type="number" className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2024 })} />
                </div>
                <div>
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="10" className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Genre *</label>
                  <select className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
                    {genres.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Runtime</label>
                  <input className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.runtime} onChange={(e) => setForm({ ...form, runtime: e.target.value })} placeholder="120 Mins" />
                </div>
              </div>

              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Subgenre</label>
                <input className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.subgenre} onChange={(e) => setForm({ ...form, subgenre: e.target.value })} placeholder="Martial Arts, Zombie, Crime..." />
              </div>

              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Image URL</label>
                <input className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://img.youtube.com/vi/.../maxresdefault.jpg" />
              </div>

              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Video URL (YouTube)</label>
                <input className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-1">Tag</label>
                  <select className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/50" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                    <option value="">None</option>
                    <option value="Featured">Featured</option>
                    <option value="Trending">Trending</option>
                    <option value="Premium">Premium</option>
                    <option value="HOT">HOT</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox bg-surface-container-highest border-outline-variant text-secondary rounded-sm focus:ring-secondary/50"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    />
                    <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">Featured Movie</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold py-3 transition-all hover:bg-surface-variant active:scale-95"
                  >
                    CANCEL
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 font-label font-bold py-3 transition-all active:scale-95 disabled:opacity-40 ${
                    editingId
                      ? 'bg-tertiary text-on-tertiary hover:shadow-[0_0_15px_rgba(255,224,74,0.4)]'
                      : 'bg-secondary text-on-secondary hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]'
                  }`}
                >
                  {submitting ? 'SAVING...' : editingId ? 'UPDATE MOVIE' : 'ADD MOVIE'}
                </button>
              </div>
            </form>
          </div>

          {/* Movie List */}
          <div className="bg-surface-container rounded-xl border border-outline/10 p-6">
            <h2 className="font-headline font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">movie</span>
              MOVIE LIST ({movies.length})
            </h2>

            {loading ? (
              <div className="text-center py-10">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-10 text-on-surface-variant font-label">No movies yet</div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {movies.map((movie) => (
                  <div key={movie.id} className="flex items-center gap-2 bg-surface-container-highest rounded-lg p-3 hover:border-secondary/50 border border-transparent transition-all group">
                    <Link href={`/detail?id=${movie.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-16 rounded bg-surface-variant overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" alt={movie.title} src={movie.imageUrl} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-on-surface truncate">{movie.title}</p>
                        <p className="text-xs text-on-surface-variant">{movie.year} &bull; {movie.genre} &bull; {movie.rating}</p>
                        {movie.tag && (
                          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-label">{movie.tag}</span>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => handleEdit(movie)}
                      className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded bg-tertiary/10 text-tertiary hover:bg-tertiary hover:text-on-tertiary transition-all"
                      title="Edit movie"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all"
                      title="Delete movie"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
