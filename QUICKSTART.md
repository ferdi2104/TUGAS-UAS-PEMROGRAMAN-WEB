# ⚡ QUICK START GUIDE - StudyFlash AI

Panduan cepat untuk memulai StudyFlash AI dalam **5 menit**!

---

## 🚀 Langkah 1: Setup (2 menit)

```bash
# 1. Clone repository (or download ZIP)
git clone https://github.com/yourusername/studyflash-ai.git
cd studyflash-ai

# 2. Install dependencies
npm install

# 3. Buat file .env.local
cp .env.example .env.local

# 4. Isi API keys di .env.local
#    - GOOGLE_GENERATIVE_AI_API_KEY: dari https://ai.google.dev
#    - Supabase credentials: dari https://supabase.com
```

---

## 🎯 Langkah 2: Run Locally (1 menit)

```bash
# Start development server
npm run dev

# ✅ Success! Buka http://localhost:3000
```

**Halaman yang akan dibuka:**
- 🏠 Homepage dengan hero section
- 📤 Upload page untuk file
- 📊 Dashboard dengan statistik
- 📚 Study page dengan flashcards
- 📖 About page

---

## 🧪 Langkah 3: Test Features (2 menit)

### Test Upload & Generate

1. Buka `http://localhost:3000`
2. Klik "Upload Catatan"
3. Drag file TXT/PDF atau klik browse
4. **Example text:**
   ```
   Fotosintesis adalah proses mengubah cahaya matahari menjadi energi kimia.
   Terjadi di klorofil dalam daun tumbuhan.
   Rumus: 6CO2 + 6H2O + cahaya → C6H12O6 + 6O2
   Terdiri dari 2 tahap: reaksi gelap dan reaksi terang.
   Hasil akhir adalah glukosa dan oksigen.
   ```
5. Wait 30-60 detik → flashcards generate otomatis
6. ✅ Check dashboard

### Test Study Mode

1. Dari dashboard, klik "🎴 Belajar Flashcard"
2. Click kartu untuk flip
3. Answer "Benar ✓" atau "Salah ❌"
4. Progress update otomatis

### Test Quiz Mode

1. Dari dashboard, klik "🎓 Mode Quiz"
2. Answer 5 multiple choice questions
3. See score at the end

---

## 📊 Expected Output

Setelah generate dari text di atas, Anda akan lihat flashcards seperti:

```json
{
  "success": true,
  "flashcards": [
    {
      "id": "fc-1704067200000-0",
      "question": "Apa itu fotosintesis?",
      "answer": "Proses mengubah cahaya matahari menjadi energi kimia",
      "difficulty": "easy"
    },
    {
      "id": "fc-1704067200000-1",
      "question": "Dua tahap fotosintesis adalah apa?",
      "answer": "Reaksi gelap dan reaksi terang",
      "difficulty": "medium"
    },
    // ... 8 more flashcards
  ],
  "count": 10,
  "fileName": "notes.txt"
}
```

---

## 🛑 Troubleshooting Quick Reference

| Error | Fix |
|-------|-----|
| Port 3000 already in use | `npx kill-port 3000` |
| "API key not found" | Check `.env.local` |
| Module not found | `npm install` |
| Build error | `npm run build` |
| Database error | Setup Supabase (lihat docs/SUPABASE_SETUP.md) |

---

## 📚 Dokumentasi Lengkap

Untuk info lebih detail, lihat:

- 📖 [docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md) - Full documentation
- 🗄️ [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md) - Database setup
- 🚀 [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) - Deploy ke production
- 🎬 [docs/VIDEO_PRESENTATION_GUIDE.md](./docs/VIDEO_PRESENTATION_GUIDE.md) - Video guide
- 📋 [docs/SOP.md](./docs/SOP.md) - Standard Operating Procedure

---

## ✅ Pre-Submission Checklist

Sebelum submit UAS, pastikan:

### Code
- [ ] Semua files ada di `/app`, `/components`, `/lib`, `/styles`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console errors: `npm run dev` → open DevTools
- [ ] Code properly formatted

### Features
- [ ] ✅ Upload file working
- [ ] ✅ AI generate flashcards working
- [ ] ✅ Study mode working
- [ ] ✅ Dashboard showing stats
- [ ] ✅ Responsive design (mobile/tablet/desktop)

### Documentation
- [ ] ✅ README.md complete
- [ ] ✅ docs/DOCUMENTATION.md complete
- [ ] ✅ docs/SOP.md complete
- [ ] ✅ docs/SUPABASE_SETUP.md complete
- [ ] ✅ docs/VERCEL_DEPLOYMENT.md complete
- [ ] ✅ docs/VIDEO_PRESENTATION_GUIDE.md complete

### Deployment
- [ ] ✅ Website deployed to Vercel (live URL)
- [ ] ✅ All pages accessible
- [ ] ✅ Features working on live site
- [ ] ✅ No console errors on live site

### Presentation
- [ ] ✅ Video recorded (max 10 min)
- [ ] ✅ Video includes: intro, demo, tech, business
- [ ] ✅ Video has good audio & video quality
- [ ] ✅ Slides created (if using)

### Submission
- [ ] ✅ GitHub repository ready
- [ ] ✅ All code committed & pushed
- [ ] ✅ Live URL ready
- [ ] ✅ Video uploaded
- [ ] ✅ Documentation complete
- [ ] ✅ Contact info provided

---

## 🎯 KPI - Key Performance Indicators

Awalnya yang diukur untuk success:

| KPI | Target | Current |
|-----|--------|---------|
| Page Load Time | < 2s | TBA |
| API Response | < 500ms | TBA |
| AI Generation | < 60s | TBA |
| Uptime | > 99.9% | TBA |
| User Satisfaction | > 4.5/5 | TBA |

---

## 🔗 Links Penting

**Local Development:**
- Frontend: http://localhost:3000
- Prisma Studio: http://localhost:5555

**Production:**
- Live Website: https://studyflash-ai.vercel.app
- GitHub: https://github.com/yourusername/studyflash-ai
- Vercel Dashboard: https://vercel.com/projects

**API Services:**
- Google Gemini: https://ai.google.dev
- Supabase: https://supabase.com
- Vercel: https://vercel.com

---

## 💬 Next Steps

1. ✅ Setup locally (`npm install` + `.env.local`)
2. ✅ Run dev server (`npm run dev`)
3. ✅ Test features (upload, study, quiz)
4. ✅ Setup Supabase database
5. ✅ Deploy to Vercel
6. ✅ Record video presentation
7. ✅ Submit UAS

---

## 🆘 Need Help?

- 📖 Read full docs di `/docs` folder
- 💻 Check GitHub Issues
- 🔍 Search error message online
- 📧 Contact: youremail@example.com

---

**Selamat coding! 🚀**

Semoga UAS Anda sukses dan mendapat nilai terbaik! 🎉
