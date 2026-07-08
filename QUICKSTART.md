# QUICK START GUIDE - NEON-ACTION CINEMA

Panduan cepat untuk memulai NEON-ACTION CINEMA dalam 5 menit!

---

## Langkah 1: Setup (2 menit)

```bash
# 1. Clone repository (or download ZIP)
git clone https://github.com/yourusername/tugas-uas-pemrograman-web.git
cd tugas-uas-pemrograman-web

# 2. Install dependencies
npm install

# 3. Buat file .env.local
cp .env.example .env.local

# 4. Isi API keys di .env.local
#    - Supabase credentials: dari https://supabase.com
```

---

## Langkah 2: Run Locally (1 menit)

```bash
# Start development server
npm run dev
```

Buka http://localhost:3000 di browser.

---

## Langkah 3: Database Setup (2 menit)

1. Buka https://supabase.com/dashboard
2. Masuk ke SQL Editor
3. Jalankan `prisma/migrasi_cinema.sql`
4. Jalankan `prisma/seed_cinema.sql`

---

## Testing

```bash
# Build untuk production
npm run build

# Lint
npm run lint
```

---

## TROUBLESHOOTING

| Masalah | Solusi |
|---------|--------|
| `Supabase not configured` | Pastikan .env.local berisi SUPABASE_URL dan ANON_KEY |
| **Blank page** | `npm run build` untuk cek error |
| **API 500 error** | Cek Supabase table sudah di-create |
| **Gambar tidak muncul** | Cek koneksi internet atau ganti imageUrl |

---

## Author

**Ferdiyansyah Pratama Putra** - NIM: 241110117
Program Studi Informatika, Universitas Mercu Buana Yogyakarta
