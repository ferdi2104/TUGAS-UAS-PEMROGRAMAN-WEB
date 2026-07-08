# Dokumentasi Index - NEON-ACTION CINEMA

Selamat datang! Berikut adalah panduan lengkap untuk NEON-ACTION CINEMA.

---

## MULAI DARI SINI

### Untuk yang baru pertama kali:
1. **Start here**: [README.md](./README.md) - Project overview
2. **Quick Setup**: [QUICKSTART.md](./QUICKSTART.md) - Setup dalam 5 menit

### Untuk yang sudah familiar:
1. **Deployment**: [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) - Vercel deployment guide
2. **Submission**: [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md) - Submission checklist

---

## DOKUMENTASI

### Setup & Installation
- **[QUICKSTART.md](./QUICKSTART.md)** - 5 menit setup guide
- **[docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)** - Database configuration

### Development
- **[README.md](./README.md)** - Project overview
- **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** - Development instructions

### Deployment
- **[docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)** - Deployment guide

---

## STRUKTUR PROYEK

```
├── app/                          # Next.js App Router pages & API
│   ├── page.tsx                  # Beranda
│   ├── layout.tsx                # Root layout
│   ├── admin/page.tsx            # Admin panel
│   ├── detail/page.tsx           # Detail film
│   ├── kategori/page.tsx         # Kategori
│   ├── pencarian/page.tsx        # Pencarian
│   ├── profile/page.tsx          # Profile
│   └── api/
│       ├── movies/route.ts       # Movies CRUD
│       ├── comments/route.ts     # Comments API
│       ├── categories/route.ts   # Categories API
│       └── notifications/route.ts # Notifications API
├── components/
│   └── Navigation.tsx            # Navigasi
├── lib/
│   └── utils.ts                  # Utilities
├── styles/
│   └── globals.css               # Global styles + neon theme
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrasi_cinema.sql        # SQL migrations
│   └── seed_cinema.sql           # Seed data
└── docs/                         # Documentation
```

---

## TECH STACK

- **Framework**: Next.js 14 (React 18, TypeScript)
- **Styling**: TailwindCSS + PostCSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

---

## AUTHOR

**Ferdiyansyah Pratama Putra** - NIM: 241110117
Program Studi Informatika, Universitas Mercu Buana Yogyakarta
