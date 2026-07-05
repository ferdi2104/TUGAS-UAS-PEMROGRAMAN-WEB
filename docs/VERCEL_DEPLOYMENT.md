# 🚀 Panduan Deploy ke Vercel

StudyFlash AI siap untuk di-deploy ke Vercel dengan 0 downtime dan auto-scaling.

## Prasyarat

- ✅ Project Next.js sudah siap
- ✅ GitHub repository sudah dibuat (push code terlebih dahulu)
- ✅ Supabase project sudah setup
- ✅ Google Gemini API key sudah ada

---

## Langkah 1: Siapkan GitHub Repository

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - StudyFlash AI"

# Push ke GitHub
git push -u origin main
```

---

## Langkah 2: Import Project di Vercel

1. Kunjungi [https://vercel.com](https://vercel.com)
2. Sign in dengan GitHub account
3. Klik "New Project"
4. Pilih repository `Tugas-uas-pemrograman-web`
5. **Framework**: Pilih "Next.js"
6. Klik "Deploy"

---

## Langkah 3: Setup Environment Variables

Di halaman Vercel project:

1. Buka tab **Settings** → **Environment Variables**
2. Tambahkan semua variables (copy dari `.env.local`):

```env
GOOGLE_GENERATIVE_AI_API_KEY=xxx
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=postgresql://xxx
```

3. Select environment: **Production**, **Preview**, **Development**
4. Klik "Save"

---

## Langkah 4: Deploy

Vercel akan otomatis deploy setelah environment variables disimpan.

Tunggu hingga:
- ✅ Build completed
- ✅ Deployment successful
- ✅ Domain created (contoh: `studyflash-ai.vercel.app`)

---

## Langkah 5: Verify Deployment

1. Klik URL domain yang diberikan Vercel
2. Cek halaman home, upload, dan dashboard
3. Test upload file → generate flashcard
4. Verifikasi tidak ada error di console

---

## Custom Domain (Optional)

Jika punya domain sendiri:

1. Di Vercel dashboard → **Domains**
2. Klik "Add" → masukkan domain Anda
3. Update DNS records sesuai instruksi Vercel
4. Wait untuk DNS propagation (±24 jam)

---

## Continuous Deployment

Setiap kali push ke `main` branch:
- Vercel otomatis build & deploy
- Preview URL untuk setiap PR
- Production deployment hanya dari main branch

```bash
# Deploy otomatis
git commit -m "Update features"
git push origin main
# Vercel akan auto-deploy!
```

---

## Environment Variables Reference

| Variable | Sumber | Notes |
|----------|--------|-------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | [ai.google.dev](https://ai.google.dev) | Free tier tersedia |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard | Public, aman di-share |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase API settings | Public key untuk client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase API settings | Secret! Jangan di-share |
| `DATABASE_URL` | Supabase Connection String | PostgreSQL URI |

---

## Troubleshooting

### Build Error: "Next.js build failed"
- ✅ Check console log di Vercel
- ✅ Pastikan semua imports valid
- ✅ Pastikan package.json dependencies lengkap

### Environment Variables Not Found
- ✅ Pastikan variable names case-sensitive
- ✅ Redeploy setelah update env vars
- ✅ Check di Settings → Environment Variables

### 502 Bad Gateway
- ✅ Check Supabase database connection
- ✅ Pastikan DATABASE_URL benar
- ✅ Verify IP whitelist di Supabase

### API Rate Limit (Google Gemini)
- ✅ Upgrade ke Google Cloud Console
- ✅ Set rate limit di Vercel
- ✅ Implementasikan rate limiting di API route

---

## Performance Monitoring

Di Vercel dashboard:

1. **Analytics** → Track requests, response time, errors
2. **Logs** → Real-time logs & error tracking
3. **Deployments** → History dan rollback options

---

## Quick Deployment Checklist

- [ ] GitHub repository ready
- [ ] All code pushed to `main` branch
- [ ] Supabase database configured
- [ ] All API keys obtained
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build successful ✅
- [ ] Deployment live at `studyflash-ai.vercel.app`
- [ ] Features tested & working
- [ ] Custom domain configured (optional)

---

🎉 Selamat! Project Anda sekarang live di internet!

Share URL ke: `https://studyflash-ai.vercel.app`
