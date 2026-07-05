<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

## StudyFlash AI - Custom Development Instructions

### Project Overview
StudyFlash AI is a SaaS platform that generates flashcards and quizzes from notes/PDFs using AI.

**Tech Stack**: Next.js 14 + TypeScript + TailwindCSS + Framer Motion + Zustand + Google Gemini AI + Supabase

### Development Checklist

- [x] Project scaffolding and folder structure
- [x] Configuration files (tsconfig, tailwind, next.config)
- [x] Core components (Navigation, Flashcard, FileUpload)
- [x] Pages (Home, Upload, Dashboard, About)
- [x] AI integration (Google Gemini API)
- [x] Spaced repetition algorithm
- [x] Utility functions
- [ ] API routes implementation
- [ ] Database integration (Supabase)
- [ ] Authentication setup
- [ ] Testing
- [ ] Deployment

### File Organization

```
/app              - Next.js app directory with pages & API routes
/components       - Reusable React components
/lib              - Utilities: AI, spaced repetition, helpers
/styles           - Global CSS with TailwindCSS
/public           - Static assets
```

### Key Files

1. **app/page.tsx** - Home page with hero section
2. **app/upload/page.tsx** - File upload interface
3. **app/dashboard/page.tsx** - Learning dashboard
4. **components/Flashcard.tsx** - Interactive flashcard component
5. **lib/ai.ts** - Google Gemini integration
6. **lib/spacing.ts** - SM-2 algorithm implementation
7. **app/api/generate/route.ts** - Flashcard generation endpoint

### Environment Setup

Before running, create `.env.local`:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=url
NEXT_PUBLIC_SUPABASE_ANON_KEY=key
```

### Running Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

### Development Guidelines

1. **Components**: Use functional components with hooks
2. **Styling**: TailwindCSS + custom CSS in globals.css
3. **Animations**: Framer Motion for smooth UX
4. **Types**: Always use TypeScript interfaces
5. **Error Handling**: Graceful fallbacks and user feedback
6. **Responsive**: Mobile-first design approach

### Next Steps (Priority Order)

1. ✅ Setup project structure
2. ✅ Create UI components
3. ⏳ Implement API route for flashcard generation
4. ⏳ Connect to Supabase database
5. ⏳ Add user authentication
6. ⏳ Implement progress tracking
7. ⏳ Add quiz mode
8. ⏳ Deploy to Vercel
9. ⏳ Create documentation
10. ⏳ Record video presentation

### Important Notes

- Google Gemini API limit: Check quota regularly
- Supabase: Setup PostgreSQL database schema first
- PDF processing: Consider pdf-parse or pdfjs-dist
- File uploads: Max 10MB, types: PDF, TXT, MD

### Testing Commands

```bash
npm run build      # Test build
npm run lint       # Check linting
npm run dev        # Start dev server
```
