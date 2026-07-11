# NEON-ACTION CINEMA - Streaming Platform

Platform streaming film cyberpunk dengan tema neon, dibangun dengan Next.js 14 + Supabase database.

## 🎬 Fitur Utama

- **Beranda** — Hero section, trending movies, sub-genre categories, newsletter signup
- **Detail Film** — Synopsis, metadata grid, comments (Student Intel), related movies, Ultra-Pass upgrade card
- **Kategori** — Bento grid genre layout dengan filter, stats counter bar
- **Pencarian** — Filter sidebar (year/genre/intensity), movie grid, pagination, scanline overlay
- **Database** — Supabase PostgreSQL dengan REST API, fallback ke hardcoded data jika DB unavailable

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: TailwindCSS + PostCSS
- **Database**: Supabase (PostgreSQL) via `@supabase/supabase-js`
- **Deployment**: Vercel

## 📁 Struktur Proyek

```
├── app/
│   ├── page.tsx                     # Beranda (hero, trending, categories)
│   ├── detail/page.tsx              # Detail film + comments
│   ├── kategori/page.tsx            # Bento grid genre
│   ├── pencarian/page.tsx           # Search dengan filter
│   ├── api/
│   │   ├── movies/route.ts          # GET /api/movies (id, featured, trending, genre)
│   │   ├── comments/route.ts        # GET/POST /api/comments
│   │   └── categories/route.ts      # GET /api/categories
│   └── layout.tsx                   # Root layout + Google Fonts
├── components/
│   └── Navigation.tsx               # Navbar neon (Movies, Series, Live, Student Perks)
├── lib/
│   └── supabase.ts                  # Supabase client + cinema helpers
├── styles/
│   └── globals.css                  # Neon utilities, scanline, grid-bg
├── prisma/
│   ├── migrasi_cinema.sql           # SQL create tables (movies, comments, categories)
│   └── seed_cinema.sql              # SQL seed data (7 movies, 6 categories, 2 comments)
└── tailwind.config.js               # Neon color palette + fonts
```

## 🚀 Database Setup (Sudah dilakukan)

1. Buka https://supabase.com/dashboard/project/dwhbhucfylqgfbktynwt/sql/new
2. Jalankan `prisma/migrasi_cinema.sql` — membuat tabel movies, comments, categories
3. Jalankan `prisma/seed_cinema.sql` — mengisi data awal

## 🔌 API Endpoints

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

## 🌐 Deployment

Otomatis deploy ke Vercel via push ke GitHub:
https://tugas-uas-pemrograman-web.vercel.app/

## 👨‍💻 Author

**Ferdiyansyah Pratama Putra** — NIM: 241110117
Program Studi Informatika, Universitas Mercu Buana Yogyakarta
