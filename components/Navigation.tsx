'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@lib/auth-context';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string;
  createdAt: string;
  read: boolean;
}

const navLinks = [
  { href: '/', label: 'Movies' },
  { href: '/kategori', label: 'Categories' },
  { href: '/pencarian', label: 'Search' },
  { href: '/admin', label: 'Admin' },
];

const mobileLinks = [
  { href: '/', label: 'Home', icon: 'movie' },
  { href: '/kategori', label: 'Categories', icon: 'category' },
  { href: '/pencarian', label: 'Search', icon: 'search' },
  { href: '/profile', label: 'Profile', icon: 'person' },
  { href: '/admin', label: 'Admin', icon: 'admin_panel_settings' },
];

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isOwner, signOut } = useAuth();
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      } finally {
        setNotifLoading(false);
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/90 backdrop-blur-md border-b border-primary/30 shadow-[0_0_20px_rgba(255,45,120,0.1)]">
        <div className="flex items-center gap-8">
          <Link className="text-2xl font-bold font-headline tracking-tighter text-primary drop-shadow-[0_0_8px_rgba(255,45,120,0.8)]" href="/">
            NEON-ACTION
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks
              .filter((link) => isOwner || link.href !== '/admin')
              .map((link) => (
              <Link
                key={link.href}
                className={`transition-colors duration-300 font-label text-sm uppercase tracking-wider ${
                  isActive(link.href)
                    ? 'text-primary font-bold border-b-2 border-primary pb-1 drop-shadow-[0_0_8px_rgba(255,45,120,0.6)]'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
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

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="w-8 h-8 rounded-full border border-secondary/50 overflow-hidden cursor-pointer active:scale-95 duration-150 bg-primary/20 flex items-center justify-center hover:border-primary transition-colors"
                title={user.email || ''}
              >
                <span className="text-xs font-bold text-primary">{userInitial}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary font-label text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              Sign In
            </Link>
          )}
        </div>
      </header>

      <button
        className="lg:hidden fixed top-4 right-4 z-[110] p-2 bg-background/80 backdrop-blur-md rounded-lg border border-primary/30 text-primary"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 overflow-y-auto py-20">
          {mobileLinks
            .filter((link) => isOwner || link.href !== '/admin')
            .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 text-2xl font-headline font-bold transition-colors ${
                isActive(link.href)
                  ? 'text-primary drop-shadow-[0_0_12px_rgba(255,45,120,0.6)]'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
              {isActive(link.href) && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              )}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="flex items-center gap-3 text-2xl font-headline font-bold text-error mt-4"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
}
