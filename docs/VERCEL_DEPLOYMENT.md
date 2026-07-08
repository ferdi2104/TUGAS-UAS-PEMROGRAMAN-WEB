# Panduan Deploy ke Vercel

NEON-ACTION CINEMA siap untuk di-deploy ke Vercel.

## Prasyarat

- Project Next.js sudah siap
- GitHub repository sudah dibuat (push code terlebih dahulu)
- Supabase project sudah setup

---

## Langkah 1: Siapkan GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit - NEON-ACTION CINEMA"
git remote add origin https://github.com/yourusername/tugas-uas-pemrograman-web.git
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

1. Buka tab **Settings** - **Environment Variables**
2. Tambahkan semua variables (copy dari `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

3. Select environment: **Production**, **Preview**, **Development**
4. Klik "Save"

---

## Langkah 4: Deploy

Vercel akan otomatis deploy setelah environment variables disimpan.

Tunggu hingga:
- Build completed
- Deployment successful
- Domain created

---

## Langkah 5: Verify Deployment

1. Klik URL domain yang diberikan Vercel
2. Cek halaman home, detail, pencarian
3. Test fitur search dan filter
4. Test comments di detail page

---

## Continuous Deployment

Setiap kali push ke `main` branch:
- Vercel otomatis build & deploy
- Preview URL untuk setiap PR

```bash
git commit -m "Update features"
git push origin main
# Vercel will auto-deploy!
```

---

## Environment Variables Reference

| Variable | Sumber | Notes |
|----------|--------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard | Public, aman di-share |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase API settings | Public key untuk client |

---

## Troubleshooting

### Build Error: "Next.js build failed"
- Check console log di Vercel
- Pastikan semua imports valid
- Pastikan package.json dependencies lengkap

### Environment Variables Not Found
- Pastikan variable names case-sensitive
- Redeploy setelah update env vars

### 502 Bad Gateway
- Check Supabase database connection
- Pastikan NEXT_PUBLIC_SUPABASE_URL benar

---

## Quick Deployment Checklist

- [ ] GitHub repository ready
- [ ] All code pushed to `main` branch
- [ ] Supabase database configured
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Build successful
- [ ] Deployment live
- [ ] Features tested & working
