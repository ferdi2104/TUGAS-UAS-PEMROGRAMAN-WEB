'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string;
  createdAt: string;
  read: boolean;
}

export default function Navigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pencarian?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleNotif = async () => {
    setNotifOpen(!notifOpen);
    if (!notifLoading && notifications.length === 0) {
      setNotifLoading(true);
      try {
        const res = await fetch('/api/notifications');
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch {} finally {
        setNotifLoading(false);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="/kategori">
              Categories
            </Link>
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="/pencarian">
              Search
            </Link>
            <Link className="text-on-surface-variant hover:text-secondary transition-colors duration-300 font-label text-sm uppercase tracking-wider" href="/admin">
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative group hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors">search</span>
            <input
              className="bg-surface-container border-none focus:ring-1 focus:ring-secondary rounded-full pl-10 pr-4 py-1.5 text-sm w-48 lg:w-64 transition-all"
              placeholder="Search universe..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="relative" ref={notifRef}>
            <button
              onClick={toggleNotif}
              className="p-2 rounded-full hover:bg-surface-variant/50 transition-all text-on-surface-variant hover:text-primary relative"
            >
              <span className="material-symbols-outlined">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[10px] font-bold text-on-primary flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface-container-highest border border-outline/30 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-4 border-b border-outline/20">
                  <h3 className="font-headline font-bold text-on-surface">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifLoading ? (
                    <div className="p-8 text-center text-on-surface-variant font-label text-sm">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center text-on-surface-variant font-label text-sm">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.link}
                        onClick={() => setNotifOpen(false)}
                        className={`block p-4 border-b border-outline/10 hover:bg-surface-variant/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`material-symbols-outlined text-sm mt-0.5 ${
                            n.type === 'movie' ? 'text-primary' :
                            n.type === 'promo' ? 'text-secondary' :
                            n.type === 'trending' ? 'text-tertiary' : 'text-on-surface-variant'
                          }`}>
                            {n.type === 'movie' ? 'movie' :
                             n.type === 'promo' ? 'redeem' :
                             n.type === 'trending' ? 'trending_up' : 'forum'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-label font-bold text-sm text-on-surface">{n.title}</p>
                            <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-on-surface-variant/60 mt-1 font-label uppercase tracking-wider">
                              {new Date(n.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/profile"
            className="w-8 h-8 rounded-full border border-secondary/50 overflow-hidden cursor-pointer active:scale-95 duration-150 bg-surface-variant flex items-center justify-center hover:border-primary transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
          </Link>
        </div>
      </header>

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
          <Link href="/profile" className="text-2xl font-headline font-bold text-on-surface-variant hover:text-secondary transition-colors" onClick={() => setIsOpen(false)}>Profile</Link>
        </div>
      )}
    </>
  );
}
