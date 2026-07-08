# Panduan Setup Supabase untuk NEON-ACTION CINEMA

## Langkah 1: Buat Project Supabase

1. Kunjungi [https://supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Sign up dengan email atau GitHub
4. Buat project baru:
   - **Project name**: `neon-action-cinema`
   - **Database password**: Buat password yang kuat (simpan di tempat aman!)
   - **Region**: Pilih yang paling dekat (contoh: `Southeast Asia (Singapore)`)

5. Tunggu project selesai di-provision

---

## Langkah 2: Ambil Credentials

Di halaman project dashboard:

1. **Database URL** - Klik "Reveal" di bagian Connection String:
   - Copy URL yang dimulai dengan `postgresql://`
   - Format: `postgresql://postgres:[password]@[host]:5432/postgres`

2. **API Keys** - Klik menu "Settings" - "API":
   - Copy `anon key` (public key)
   - Copy `service_role key` (secret key)

---

## Langkah 3: Buat Tables via SQL Editor

1. Di Supabase dashboard, buka "SQL Editor"
2. Klik "New Query"
3. Copy seluruh isi dari file `prisma/migrasi_cinema.sql`
4. Paste ke SQL Editor
5. Klik "Run"
6. Tunggu sampai semua tabel berhasil dibuat

---

## Langkah 4: Seed Data

1. Buka SQL Editor lagi
2. Copy dari `prisma/seed_cinema.sql`
3. Run query untuk mengisi data awal

---

## Langkah 5: Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

---

## Quick Verification Checklist

- [ ] Project Supabase berhasil dibuat
- [ ] Tabel movies, comments, categories sudah ada
- [ ] `.env.local` sudah diisi dengan semua credentials
- [ ] Semua halaman bisa load data dari database
