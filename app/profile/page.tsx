'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WatchHistoryItem {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  genre: string;
}

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [stats, setStats] = useState({
    moviesWatched: 0,
    commentsPosted: 0,
    watchlistCount: 0,
    streakDays: 0,
  });

  useEffect(() => {
    const savedName = localStorage.getItem('commentUsername');
    const savedEmail = localStorage.getItem('profileEmail');
    if (savedName) setUsername(savedName);
    if (savedEmail) setEmail(savedEmail);

    const historyRaw = localStorage.getItem('watchHistory');
    if (historyRaw) {
      try {
        const history = JSON.parse(historyRaw) as WatchHistoryItem[];
        setWatchHistory(history);
        setStats({
          moviesWatched: history.length,
          commentsPosted: parseInt(localStorage.getItem('commentCount') || '0'),
          watchlistCount: parseInt(localStorage.getItem('watchlistCount') || '0'),
          streakDays: parseInt(localStorage.getItem('streakDays') || '0'),
        });
      } catch {
        setStats({ moviesWatched: 0, commentsPosted: 0, watchlistCount: 0, streakDays: 0 });
      }
    }
  }, []);

  const handleSave = () => {
    if (username.trim()) {
      localStorage.setItem('commentUsername', username.trim());
    }
    if (email.trim()) {
      localStorage.setItem('profileEmail', email.trim());
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="pt-24 pb-12 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-secondary overflow-hidden bg-surface-variant flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-4xl sm:text-5xl text-on-surface-variant">person</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-on-surface mb-2">{username || 'Student Agent'}</h1>
            <p className="text-on-surface-variant font-body mb-4 text-sm sm:text-base">{email || 'Belum ada email'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Link href="/pencarian">
                <button className="bg-primary text-on-primary font-label font-bold px-4 sm:px-5 py-2 text-xs sm:text-sm transition-all hover:shadow-[0_0_15px_rgba(255,45,120,0.5)] active:scale-95">
                  BROWSE MOVIES
                </button>
              </Link>
              <Link href="/admin">
                <button className="bg-surface-container-highest border border-outline/30 text-on-surface font-label font-bold px-4 sm:px-5 py-2 text-xs sm:text-sm transition-all hover:bg-surface-variant active:scale-95">
                  ADMIN PANEL
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            { label: 'Movies Watched', value: stats.moviesWatched, icon: 'movie', color: 'text-primary' },
            { label: 'Comments', value: stats.commentsPosted, icon: 'comment', color: 'text-secondary' },
            { label: 'Watchlist', value: stats.watchlistCount, icon: 'bookmark', color: 'text-tertiary' },
            { label: 'Day Streak', value: stats.streakDays, icon: 'local_fire_department', color: 'text-primary' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container rounded-xl border border-outline/10 p-3 sm:p-5 text-center">
              <span className={`material-symbols-outlined text-xl sm:text-2xl ${stat.color} mb-1 sm:mb-2`} style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <p className="text-xl sm:text-2xl font-bold font-headline text-on-surface">{stat.value}</p>
              <p className="text-[10px] sm:text-xs font-label text-on-surface-variant uppercase tracking-widest mt-1 truncate">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Edit Profile */}
          <div className="bg-surface-container rounded-xl border border-outline/10 p-5 sm:p-6">
            <h2 className="font-headline font-bold text-lg sm:text-xl text-on-surface mb-4 sm:mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">edit</span>
              EDIT PROFILE
            </h2>
            <div className="space-y-4">
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-2">Callsign</label>
                <input
                  className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all text-sm"
                  placeholder="Your callsign"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-widest block mb-2">Email</label>
                <input
                  className="w-full bg-surface-container-highest border border-outline/30 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary/50 transition-all text-sm"
                  placeholder="student@university.edu"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-secondary text-on-secondary font-label font-bold py-3 transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] active:scale-95"
              >
                {saved ? 'SAVED!' : 'SAVE PROFILE'}
              </button>
            </div>
          </div>

          {/* Student Pass */}
          <div className="bg-surface-container rounded-xl border border-secondary/20 p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 blur-[60px] rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-secondary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label text-xs sm:text-sm font-bold uppercase tracking-widest">Student Pass</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-headline text-on-surface mb-2">FREE TIER</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-5 sm:mb-6">
                Status: <span className="text-secondary font-bold">Active</span> &bull; Verified via university portal
              </p>
              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { label: 'HD Streaming', active: true },
                  { label: 'Ad-free', active: true },
                  { label: '10 Movies/month', active: true },
                  { label: '1080p Ultra', active: false },
                  { label: 'Download Offline', active: false },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-sm ${feature.active ? 'text-secondary' : 'text-on-surface-variant/40'}`}>
                      {feature.active ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`text-xs sm:text-sm font-body ${feature.active ? 'text-on-surface' : 'text-on-surface-variant/60'}`}>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Watch History */}
        <div className="bg-surface-container rounded-xl border border-outline/10 p-5 sm:p-6">
          <h2 className="font-headline font-bold text-lg sm:text-xl text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">history</span>
            WATCH HISTORY
          </h2>
          {watchHistory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {watchHistory.map((item, i) => (
                <Link key={i} href={`/detail?id=${item.id}`} className="group">
                  <div className="aspect-[2/3] bg-surface-variant rounded-lg overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={item.title} src={item.imageUrl} />
                  </div>
                  <p className="text-xs sm:text-sm font-label text-on-surface mt-2 truncate">{item.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-10">
              <span className="material-symbols-outlined text-3xl sm:text-4xl text-on-surface-variant/40 mb-3">movie</span>
              <p className="text-on-surface-variant font-body text-sm">Belum ada riwayat nonton.</p>
              <Link href="/pencarian">
                <button className="mt-4 bg-primary/20 text-primary border border-primary/40 px-5 sm:px-6 py-2 font-label text-xs sm:text-sm font-bold hover:bg-primary hover:text-on-primary transition-all">
                  EXPLORE MOVIES
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
