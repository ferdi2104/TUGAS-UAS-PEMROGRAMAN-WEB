# 📚 Panduan Setup Supabase untuk StudyFlash AI

## Langkah 1: Buat Project Supabase

1. Kunjungi [https://supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Sign up dengan email atau GitHub
4. Buat project baru:
   - **Project name**: `studyflash-ai`
   - **Database password**: Buat password yang kuat (simpan di tempat aman!)
   - **Region**: Pilih yang paling dekat (contoh: `Southeast Asia (Singapore)`)

5. Tunggu project selesai di-provision (±2 menit)

---

## Langkah 2: Ambil Credentials

Di halaman project dashboard:

1. **Database URL** → Klik "Reveal" di bagian Connection String:
   - Copy URL yang dimulai dengan `postgresql://`
   - Format: `postgresql://postgres:[password]@[host]:5432/postgres`

2. **API Keys** → Klik menu "Settings" → "API":
   - Copy `anon key` (public key)
   - Copy `service_role key` (secret key)

---

## Langkah 3: Buat Tables via SQL Editor

1. Di Supabase dashboard, buka "SQL Editor"
2. Klik "New Query"
3. Copy seluruh isi dari file `prisma/migrations.sql`
4. Paste ke SQL Editor
5. Klik "Run" (atau tekan Ctrl+Enter)
6. Tunggu sampai semua tabel berhasil dibuat ✅

---

## Langkah 4: Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"

# AI
GOOGLE_GENERATIVE_AI_API_KEY="your_google_api_key_here"

# Auth (optional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"
```

---

## Langkah 5: Install Dependencies

```bash
npm install @supabase/supabase-js @prisma/client
npm install -D prisma
```

---

## Langkah 6: Test Connection

```bash
# Generate Prisma Client
npx prisma generate

# Buka Prisma Studio untuk verify database
npx prisma studio
```

Jika berhasil, browser akan membuka `http://localhost:5555` dengan tampilan semua tabel ✅

---

## Langkah 7: Initialize Prisma (Optional)

Jika ingin menggunakan Prisma untuk migrations:

```bash
npx prisma migrate deploy
```

---

## Troubleshooting

### Error: "FATAL: Password authentication failed"
- ✅ Pastikan password di `.env.local` sama dengan password saat setup
- ✅ Jika lupa, reset di Supabase dashboard → Database → Password

### Error: "relation 'public.users' does not exist"
- ✅ Pastikan SQL migrations sudah di-run di SQL Editor
- ✅ Refresh Prisma Studio

### Error: "ECONNREFUSED"
- ✅ Pastikan DATABASE_URL benar
- ✅ Cek koneksi internet
- ✅ Verify IP whitelist di Supabase (biasanya auto)

---

## Quick Verification Checklist

- [ ] Project Supabase berhasil dibuat
- [ ] 6 tables sudah ada (users, documents, flashcards, user_progress, review_history, dll)
- [ ] `.env.local` sudah diisi dengan semua credentials
- [ ] `npm install` dependencies selesai
- [ ] Prisma Studio bisa dibuka
- [ ] Connection test successful ✅

---

## Database Schema Overview

```
users (1) ──── (many) documents
              ──── (many) user_progress

documents (1) ──── (many) flashcards

flashcards (1) ──── (many) user_progress
             ──── (many) review_history

user_progress & review_history track learning progress
```

---

Setelah semuanya setup, Anda siap untuk:
- Buat API routes untuk CRUD operations
- Integrasikan ke components
- Deploy ke Vercel

Pertanyaan? Baca dokumentasi Supabase: [https://supabase.com/docs](https://supabase.com/docs)
