# TODO - StudyFlash AI koreksi Supabase & alur belajar

## Step 1 — Persiapan
- [ ] Pastikan `.env.local` berisi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, dan `GOOGLE_GENERATIVE_AI_API_KEY`.

## Step 2 — Integrasi upload ke Supabase
- [ ] Update `app/upload/page.tsx`: setelah generate sukses, panggil `uploadDocument` lalu `createFlashcards`.
- [ ] Hentikan penyimpanan flashcards/documentName ke `localStorage` untuk alur Supabase.

## Step 3 — Integrasi dashboard
- [ ] Update `app/dashboard/page.tsx`: ambil `documents` dan flashcards dari Supabase.
- [ ] Pilih default document (mis. document terbaru) dan tampilkan stats dari Supabase.
- [ ] Perbaiki Tailwind dynamic class (`bg-${...}`) agar tidak hilang saat build.

## Step 4 — Integrasi study progress (Benar/Salah)
- [ ] Update `app/study/page.tsx`: ambil flashcards dari Supabase (document terbaru).
- [ ] Saat klik Benar/Salah: panggil `updateProgress` ke Supabase.

## Step 5 — Testing
- [ ] Jalankan `npm run build` untuk memastikan tidak ada error TypeScript/Next.
- [ ] Smoke test alur: `/upload` → `/dashboard` → `/study`.

## Step 6 — Bonus (opsional)
- [ ] Perbaiki `/api/generate` untuk ekstraksi PDF yang benar (bukan `file.text()`).
- [ ] Rate limit / batas ukuran konten untuk API.