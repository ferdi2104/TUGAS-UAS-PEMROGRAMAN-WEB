# StudyFlash AI - AI Flashcard/Quiz Generator

Platform SaaS revolusioner untuk mengubah catatan/PDF menjadi flashcard dan kuis interaktif menggunakan AI.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)

## ✨ Fitur Utama

### 1. Upload & Processing
- ✅ Upload PDF, TXT, MD files (max 10MB)
- ✅ Ekstraksi teks otomatis dari PDF
- ✅ Validasi dan normalisasi konten

### 2. AI-Powered Q&A Generation
- ✅ Menggunakan Google Gemini AI API
- ✅ Generate 10+ flashcard berkualitas tinggi
- ✅ Variasi tingkat kesulitan (Easy, Medium, Hard)
- ✅ Pertanyaan yang relevan dan jawaban ringkas

### 3. Interactive Flashcards
- ✅ Animasi flip smooth dengan Framer Motion
- ✅ Mode study interaktif
- ✅ Visual feedback untuk jawaban
- ✅ Navigation intuitif antar kartu

### 4. Quiz Mode
- ✅ Multiple choice questions
- ✅ Instant scoring
- ✅ Detailed results analysis

### 5. Spaced Repetition Algorithm
- ✅ SM-2 Algorithm untuk optimal retention
- ✅ Scheduling otomatis review cards
- ✅ Difficulty-based adjustments

### 6. Progress Tracking
- ✅ Dashboard dengan statistik real-time
- ✅ Visualisasi progress pembelajaran
- ✅ History review card

### 7. User Authentication
- ✅ NextAuth.js integration (coming soon)
- ✅ Secure session management
- ✅ User profile & preferences

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: TailwindCSS + PostCSS
- **Animations**: Framer Motion
- **State**: Zustand
- **HTTP**: Axios

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js (planned)
- **AI**: Google Generative AI (Gemini)
- **File Upload**: Multer

### Deployment
- **Hosting**: Vercel (recommended)
- **Database**: Supabase
- **CDN**: Vercel Edge Network

## 📥 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd studyflash-ai
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI API
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key

# NextAuth (optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_hex_32
```

### 4. Database Setup (Supabase)
```bash
npm run db:generate
npm run db:push
```

### 5. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🚀 Usage

### 1. Upload Catatan
- Buka halaman `/upload`
- Drag & drop atau pilih file (PDF/TXT/MD)
- Tunggu proses AI generate flashcard

### 2. Belajar dengan Flashcard
- Pergi ke `/dashboard`
- Klik "Belajar Flashcard"
- Flip kartu untuk melihat jawaban
- Mark sebagai "Benar" atau "Salah"

### 3. Quiz Mode
- Dari dashboard, klik "Mode Quiz"
- Jawab pertanyaan dalam format multiple choice
- Lihat score dan analisis hasil

### 4. Track Progress
- Dashboard menampilkan statistik real-time
- Lihat progress bar harian dan mingguan
- Monitor kartu yang sudah dikuasai

## 🔌 API Documentation

### POST /api/generate

Generate flashcards dari file/teks.

**Request:**
```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('content', textContent);

const response = await fetch('/api/generate', {
  method: 'POST',
  body: formData,
});
```

**Response:**
```json
{
  "success": true,
  "flashcards": [
    {
      "id": "fc-1234567890-0",
      "question": "Apa itu algoritma SM-2?",
      "answer": "Algoritma untuk spaced repetition optimal",
      "difficulty": "medium"
    }
  ],
  "count": 10,
  "fileName": "notes.pdf"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": "Detailed error info"
}
```

## 📊 Database Schema

### Tables
- `users` - User profiles
- `documents` - Uploaded documents
- `flashcards` - Generated flashcards
- `user_progress` - Learning progress
- `review_history` - Review records

See `prisma/schema.prisma` untuk detail lengkap.

## 📁 Project Structure

```
studyflash-ai/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API for flashcard generation
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard
│   ├── upload/
│   │   └── page.tsx              # Upload page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Navigation.tsx            # Nav component
│   ├── Flashcard.tsx             # Flashcard component
│   └── FileUpload.tsx            # File upload component
├── lib/
│   ├── ai.ts                     # AI integration
│   ├── spacing.ts                # Spaced repetition logic
│   └── utils.ts                  # Utility functions
├── styles/
│   └── globals.css               # Global styles
├── public/                        # Static assets
├── .env.example                  # Environment template
├── next.config.js                # Next.js config
├── tailwind.config.js            # TailwindCSS config
└── tsconfig.json                 # TypeScript config
```

## 🎓 Spaced Repetition Algorithm

Kami mengimplementasikan **SM-2 Algorithm**:

```
EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

Interval:
- Repeat 1: 1 hari
- Repeat 2: 3 hari
- Repeat 3+: interval * EF
```

Dimana `q` = quality (0-5) dan `EF` = easiness factor.

## 📈 Progress Tracking

Dashboard menampilkan:
- **Total Flashcard**: Total kartu yang di-generate
- **Sudah Pelajari**: Kartu yang sudah dilihat
- **Sedang Belajar**: Kartu dalam proses pembelajaran
- **Sudah Dikuasai**: Kartu dengan retention tinggi
- **Progress Bar**: Visualisasi kemajuan harian/mingguan

## 🔐 Security

- Input validation & sanitization
- File type & size validation
- API rate limiting (planned)
- User authentication (planned)
- CORS enabled

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy ke Vercel

```bash
npm run build
vercel deploy
```

### Environment Variables di Vercel
- Set semua variabel di `.env.local` di Vercel dashboard
- Pastikan database credentials aman

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - lihat file LICENSE untuk detail.

## 👨‍💼 Author

**Ferdiyansyah Pratama Putra**
- NIM: 241110117
- Program Studi: Informatika
- Universitas Mercu Buana Yogyakarta

## 📞 Support

Untuk masalah atau pertanyaan, buat issue di repository.

## 🎯 Roadmap

- [ ] User Authentication (NextAuth.js)
- [ ] Database Integration (Supabase)
- [ ] Export flashcards ke Anki/Quizlet
- [ ] Collaborative learning
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Premium features
- [ ] Analytics dashboard

## ⭐ Features Planned

- GPT-4 Integration option
- OCR untuk gambar di PDF
- Text-to-speech
- Dark mode
- Multiple languages
- Social sharing
- Leaderboard

---

**Happy Learning! 📚✨**
