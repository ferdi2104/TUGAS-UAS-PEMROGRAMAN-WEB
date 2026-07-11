# NEON-ACTION CINEMA - Streaming Platform

Platform streaming film cyberpunk dengan tema neon, dibangun dengan Next.js 14 + Supabase database.

## Fitur Utama

- **Autentikasi Wajib** — Login & register wajib untuk mengakses seluruh halaman. Middleware memblokir akses tanpa session.
- **Beranda** — Hero section, trending movies, sub-genre categories, newsletter signup
- **Detail Film** — Synopsis, metadata grid, comments (Student Intel), related movies, Ultra-Pass upgrade card
- **Kategori** — Bento grid genre layout dengan filter, stats counter bar
- **Pencarian** — Filter sidebar (year/genre/intensity), movie grid, pagination, scanline overlay
- **Database** — Supabase PostgreSQL dengan REST API, fallback ke hardcoded data jika DB unavailable

## Tech Stack

- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: TailwindCSS + PostCSS
- **Database**: Supabase (PostgreSQL) via `@supabase/supabase-js`
- **Auth**: Supabase Auth via `@supabase/ssr` (cookie-based session)
- **Deployment**: Vercel

## Struktur Proyek

```
├── app/
│   ├── page.tsx                     # Beranda (hero, trending, categories)
│   ├── detail/page.tsx              # Detail film + comments
│   ├── kategori/page.tsx            # Bento grid genre
│   ├── pencarian/page.tsx           # Search dengan filter
│   ├── profile/page.tsx             # User profile
│   ├── login/page.tsx               # Halaman login
│   ├── register/page.tsx            # Halaman registrasi
│   ├── auth/callback/route.ts       # OAuth email confirmation callback
│   ├── api/
│   │   ├── movies/route.ts          # GET /api/movies (id, featured, trending, genre)
│   │   ├── comments/route.ts        # GET/POST /api/comments
│   │   ├── categories/route.ts      # GET /api/categories
│   │   └── notifications/route.ts   # GET/POST /api/notifications
│   └── layout.tsx                   # Root layout + AuthProvider
├── components/
│   └── Navigation.tsx               # Navbar dengan user state + logout
├── lib/
│   ├── auth-context.tsx             # React context untuk session management
│   ├── supabase/
│   │   ├── client.ts                # Browser Supabase client
│   │   ├── server.ts                # Server Supabase client (cookies)
│   │   └── middleware.ts            # Middleware Supabase client
│   ├── types.ts                     # TypeScript interfaces (Movie, Comment, Category)
│   └── utils.ts                     # Utility functions
├── middleware.ts                     # Route protection — redirect ke /login jika unauthenticated
├── styles/
│   └── globals.css                  # Neon utilities, scanline, grid-bg
├── prisma/
│   ├── migrasi_cinema.sql           # SQL create tables (movies, comments, categories)
│   └── seed_cinema.sql              # SQL seed data (7 movies, 6 categories, 2 comments)
└── tailwind.config.js               # Neon color palette + fonts
```

## Autentikasi

Semua halaman dilindungi oleh middleware. Pengguna **wajib login atau register** untuk mengakses website.

### Alur Autentikasi

1. **Register** — Pengguna membuat akun baru di `/register` (nama, email, password)
2. **Email Confirmation** — Supabase mengirim email konfirmasi. Klik link di email untuk verify.
3. **Login** — Pengguna masuk di `/login` dengan email & password
4. **Session** — Session disimpan di cookies via `@supabase/ssr`, valid di server & client
5. **Logout** — Klik tombol Logout di navbar untuk mengakhiri session

### Route Protection

Middleware di `middleware.ts` memeriksa session di setiap request:
- Tanpa session → redirect ke `/login`
- Sudah login tapi akses `/login` atau `/register` → redirect ke `/`

Public paths (tidak perlu auth): `/login`, `/register`, `/auth/callback`

### File Autentikasi

| File | Fungsi |
|------|--------|
| `middleware.ts` | Route protection, redirect unauthenticated users |
| `lib/supabase/client.ts` | Browser client (untuk form login/register) |
| `lib/supabase/server.ts` | Server client (untuk server components & route handlers) |
| `lib/supabase/middleware.ts` | Middleware client + auth check logic |
| `lib/auth-context.tsx` | React context — `useAuth()` → `{ user, loading, signOut }` |
| `app/login/page.tsx` | Form login dengan email + password |
| `app/register/page.tsx` | Form register dengan nama, email, password, konfirmasi password |
| `app/auth/callback/route.ts` | Handle OAuth callback dari email konfirmasi |

### Setup Supabase Auth

Pastikan di dashboard Supabase (https://supabase.com/dashboard):
1. Buka project → Authentication → Providers → pastikan **Email** provider aktif
2. Authentication → Email Templates → customize email konfirmasi
3. (Opsional) Authentication → Settings → Disable email confirmation jika ingin langsung aktif

## Database Setup

1. Buka https://supabase.com/dashboard/project/dwhbhucfylqgfbktynwt/sql/new
2. Jalankan `prisma/migrasi_cinema.sql` — membuat tabel movies, comments, categories
3. Jalankan `prisma/seed_cinema.sql` — mengisi data awal

## API Endpoints

### GET /api/movies
| Parameter | Deskripsi |
|-----------|-----------|
| `?id={uuid}` | Detail film by ID |
| `?featured=true` | Featured movie (single) |
| `?trending=true` | Trending movies (top 5) |
| `?genre={genre}` | Movies by genre |

### GET /api/comments?movieId={uuid}
Comments untuk film tertentu.

### POST /api/comments
```json
{ "movieId": "uuid", "username": "string", "content": "string" }
```

### GET /api/categories
Semua kategori.

## Deployment

Otomatis deploy ke Vercel via push ke GitHub:
https://tugas-uas-pemrograman-web.vercel.app/

## Author

**Ferdiyansyah Pratama Putra** — NIM: 241110117
Program Studi Informatika, Universitas Mercu Buana Yogyakarta
