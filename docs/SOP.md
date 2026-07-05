# SOP - Standard Operating Procedure
## StudyFlash AI - AI Flashcard Generator

**Document Type**: Standard Operating Procedure  
**Version**: 1.0  
**Date**: Januari 2025  
**Author**: Ferdiyansyah Pratama Putra  
**Status**: Final

---

## 1. SOP SETUP & INSTALLATION

### 1.1 System Requirements
- OS: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+)
- RAM: Minimum 4GB (recommended 8GB)
- Storage: 2GB free space
- Node.js: 18.x LTS atau lebih baru
- npm: 9.x atau lebih baru
- Internet: Required untuk API calls

### 1.2 Initial Setup (Development Environment)

#### Step 1: Clone Repository
```bash
# Buka terminal/command prompt
git clone https://github.com/yourusername/studyflash-ai.git
cd studyflash-ai
```

#### Step 2: Install Node.js & npm
```bash
# Check versi Node.js
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher

# If not installed, download from nodejs.org
```

#### Step 3: Install Dependencies
```bash
# Install all project dependencies
npm install

# This will install:
# - Next.js 14
# - React 18
# - TailwindCSS
# - Framer Motion
# - Supabase client
# - Google AI SDK
# - And 25+ others
```

#### Step 4: Setup Environment Variables
```bash
# Create .env.local file
cp .env.example .env.local

# Fill in the values (see below)
# Use text editor: VS Code, Notepad++, etc.
```

#### Step 5: Required API Keys

**Get Google Gemini API Key:**
1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new API key
4. Copy and paste ke `GOOGLE_GENERATIVE_AI_API_KEY`

**Get Supabase Credentials:**
1. Go to https://supabase.com
2. Create new project
3. Wait for provisioning
4. Copy credentials ke `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### Step 6: Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Verify database connection
npx prisma studio
# Should open http://localhost:5555
```

#### Step 7: Run Development Server
```bash
npm run dev

# Success messages:
# ✓ Compiled client and server successfully
# ✓ Ready on http://localhost:3000
```

**Troubleshooting Installation:**

| Problem | Solution |
|---------|----------|
| `npm install` fails | Clear cache: `npm cache clean --force` |
| Port 3000 already in use | Kill process: `npx kill-port 3000` |
| Module not found error | Reinstall: `rm -rf node_modules && npm install` |
| Prisma error | Run: `npx prisma generate` |

---

## 2. SOP DAILY WORKFLOW

### 2.1 Starting Development Session

```bash
# 1. Navigate to project
cd path/to/studyflash-ai

# 2. Verify .env.local exists
# Ensure all keys are set

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000 in browser

# 5. Check for errors in terminal
# If no errors, proceed to development
```

### 2.2 Feature Development Cycle

#### Step 1: Create Feature Branch
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/feature-name
# Example: git checkout -b feature/quiz-mode
```

#### Step 2: Implement Changes
- Edit files in `/app`, `/components`, `/lib`
- Follow TypeScript best practices
- Use existing components when possible
- Add proper error handling

#### Step 3: Test Locally
```bash
# Run in browser
npm run dev

# Test the feature thoroughly:
# - Check responsive design (mobile/tablet/desktop)
# - Check error scenarios
# - Check console for warnings/errors
# - Test with different input data
```

#### Step 4: Commit & Push
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add quiz mode functionality"

# Push to GitHub
git push origin feature/feature-name
```

#### Step 5: Create Pull Request
- Go to GitHub repository
- Create Pull Request dari feature branch ke main
- Add description & screenshots
- Request code review (if team)
- Merge after approval

#### Step 6: Deploy
```bash
# Main branch automatically deploys to Vercel
# Check deployment status: https://vercel.com/projects

# If issue, rollback:
# Settings → Deployments → Click previous version
```

### 2.3 Testing Procedure

#### Unit Testing (TBA)
```bash
npm run test          # Run all tests
npm run test:watch   # Watch mode for development
npm run test:coverage # Code coverage report
```

#### Integration Testing
- Manual testing through UI
- Test all major user flows
- Check database operations

#### Performance Testing
```bash
npm run build         # Test production build

# Check build size
# Should be < 50MB for production
```

---

## 3. SOP FILE STRUCTURE & COMPONENTS

### 3.1 Project Hierarchy

```
studyflash-ai/
├── app/                           # Next.js 14 App Router
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── upload/page.tsx           # Upload page
│   ├── dashboard/page.tsx        # Dashboard
│   ├── study/page.tsx            # Study flashcards
│   ├── about/page.tsx            # About page
│   └── api/
│       ├── generate/route.ts     # Generate flashcards API
│       ├── progress/route.ts     # Progress tracking API (TBA)
│       └── stats/route.ts        # Stats API (TBA)
│
├── components/                    # Reusable components
│   ├── Navigation.tsx            # Navigation bar
│   ├── Flashcard.tsx             # Flashcard component
│   ├── FileUpload.tsx            # File upload component
│   ├── Stats.tsx                 # Stats cards (TBA)
│   └── Quiz.tsx                  # Quiz component (TBA)
│
├── lib/                          # Utility & business logic
│   ├── ai.ts                     # Google Gemini integration
│   ├── spacing.ts                # Spaced repetition algorithm
│   ├── utils.ts                  # Helper functions
│   └── supabase.ts               # Supabase client & queries
│
├── styles/                       # CSS & styling
│   └── globals.css              # Global styles & animations
│
├── public/                       # Static assets
│   ├── logo.png
│   └── favicon.ico
│
├── prisma/                      # Database
│   ├── schema.prisma            # Data models
│   ├── migrations.sql           # SQL migrations
│   └── seed.ts                  # Seed data (TBA)
│
├── docs/                        # Documentation
│   ├── DOCUMENTATION.md         # Full documentation
│   ├── SUPABASE_SETUP.md        # Database setup
│   ├── VERCEL_DEPLOYMENT.md     # Deployment guide
│   ├── VIDEO_PRESENTATION_GUIDE.md # Video guide
│   └── SOP.md                   # This file
│
├── .github/                     # GitHub config
│   └── copilot-instructions.md  # Development instructions
│
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind config
├── postcss.config.js           # PostCSS config
├── vercel.json                 # Vercel config
├── .env.example                # Environment template
├── .gitignore                  # Git ignore file
├── README.md                   # Project overview
└── LICENSE                     # MIT License
```

### 3.2 Component Guidelines

**Navigation.tsx:**
- Sticky navbar yang responsive
- Links: Home, Upload, Dashboard, About
- Mobile hamburger menu
- Props: none (standalone)

**Flashcard.tsx:**
- Interactive flashcard dengan flip animation
- Props: `{ id, question, answer, onAnswer }`
- Events: Click flip, Mark correct/incorrect
- Styling: TailwindCSS gradient

**FileUpload.tsx:**
- Drag & drop upload zone
- File validation (type & size)
- Props: `{ onUpload }`
- Supports: PDF, TXT, MD
- Max size: 10MB

---

## 4. SOP DEPLOYMENT

### 4.1 Local Deployment (Development)

```bash
# Terminal 1: Start dev server
npm run dev
# Runs at http://localhost:3000

# Terminal 2 (optional): Run Prisma Studio
npx prisma studio
# Runs at http://localhost:5555
```

### 4.2 Production Deployment (Vercel)

**Prerequisites:**
- GitHub repository created & pushed
- Supabase database configured
- API keys obtained

**Deployment Steps:**

1. **Connect GitHub to Vercel**
   ```
   Go to https://vercel.com/import
   → Connect GitHub account
   → Select repository
   → Click Deploy
   ```

2. **Configure Environment Variables**
   ```
   Settings → Environment Variables
   Add:
   - GOOGLE_GENERATIVE_AI_API_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - DATABASE_URL
   ```

3. **Trigger Build & Deploy**
   ```
   Automatic: Every push to main
   Manual: Click "Redeploy" in Vercel dashboard
   ```

4. **Monitor Deployment**
   ```
   Vercel dashboard → Deployments
   Watch progress:
   - Building
   - Installing dependencies
   - Building project
   - Ready!
   ```

5. **Verify Live Site**
   ```
   Visit: https://studyflash-ai.vercel.app
   Test:
   - ✓ Load homepage
   - ✓ Test upload
   - ✓ Generate flashcards
   - ✓ Study mode
   - ✓ Check console for errors
   ```

---

## 5. SOP MAINTENANCE & MONITORING

### 5.1 Daily Checks

```bash
# Check server status
# Visit https://studyflash-ai.vercel.app

# Check Vercel logs
# Vercel dashboard → Deployments → Click deployment → Logs

# Monitor Supabase
# supabase.com → project → Logs
```

### 5.2 Weekly Maintenance

```
Monday:
- [ ] Check analytics (Vercel + custom)
- [ ] Review user feedback
- [ ] Check API usage & costs

Wednesday:
- [ ] Backup database manually (Supabase has auto-backup)
- [ ] Review performance metrics
- [ ] Check for security updates

Friday:
- [ ] Weekly standdown/review
- [ ] Plan improvements
- [ ] Update documentation
```

### 5.3 Monthly Tasks

```
- [ ] Review & optimize queries
- [ ] Check API rate limits
- [ ] Update dependencies: npm update
- [ ] Security audit
- [ ] Customer support review
- [ ] Usage metrics analysis
```

### 5.4 Error Handling Protocol

**When user reports error:**

1. **Collect Information**
   ```
   - Error message
   - Screenshot
   - Steps to reproduce
   - Browser & OS info
   ```

2. **Check Logs**
   ```
   - Vercel dashboard: Functions & Logs
   - Browser console: F12 → Console tab
   - Supabase: Logs section
   ```

3. **Identify Root Cause**
   - Frontend issue (CSS, JS)
   - API error (server-side)
   - Database issue (query, connection)
   - External API (Google Gemini, Supabase)

4. **Fix & Test**
   ```
   git checkout -b fix/issue-name
   Make changes
   Test locally: npm run dev
   Commit & push
   Merge to main
   Verify in production
   ```

5. **Document & Follow-up**
   - Create GitHub issue
   - Update documentation
   - Reply to user with explanation

---

## 6. SOP SECURITY

### 6.1 API Key Management

**❌ NEVER:**
- Commit `.env.local` to Git
- Share API keys publicly
- Use production keys in development
- Expose keys in client-side code

**✅ DO:**
- Use `.env.example` as template
- Store keys in Vercel dashboard
- Rotate keys quarterly
- Use environment-specific keys

### 6.2 Data Protection

**Database Security:**
- [ ] Enable SSL connection (Supabase does by default)
- [ ] Regular backups (Supabase automatic)
- [ ] User data encryption
- [ ] SQL injection prevention (Prisma ORM handles)

**API Security:**
- [ ] Input validation on all endpoints
- [ ] Rate limiting (TBA)
- [ ] CORS configuration
- [ ] Error messages don't leak sensitive info

### 6.3 Deployment Security

```bash
# Before deploying
npm audit              # Check vulnerabilities
npm audit fix          # Auto-fix vulnerabilities

# Review changes
git diff main..feature-branch

# Test thoroughly
npm run build
npm run dev

# Deploy to staging first (if available)
# Then deploy to production
```

---

## 7. SOP PERFORMANCE OPTIMIZATION

### 7.1 Frontend Optimization

```typescript
// Use React.memo for expensive components
const Flashcard = React.memo(({ id, question, answer }) => {
  // Component code
});

// Use useCallback for event handlers
const handleAnswer = useCallback((correct: boolean) => {
  // Handler code
}, []);

// Use useMemo for complex calculations
const stats = useMemo(() => {
  // Calculate stats
}, [data]);

// Image optimization (Next.js Image component)
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

### 7.2 API Optimization

```typescript
// Add caching headers
response.headers.set('Cache-Control', 'max-age=3600');

// Implement pagination
const ITEMS_PER_PAGE = 20;
const offset = (page - 1) * ITEMS_PER_PAGE;
query.skip(offset).take(ITEMS_PER_PAGE);

// Use database indexes
// Already configured in migrations.sql
```

### 7.3 Database Optimization

```sql
-- Already implemented in migrations.sql
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_flashcards_document_id ON flashcards(document_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
```

### 7.4 Monitoring Performance

```bash
# Build size
npm run build

# Lighthouse audit
# Open DevTools → Lighthouse → Generate report

# Vercel Analytics
# vercel.com → project → Analytics

# Monitor API response time
# Vercel → Deployments → Click deployment → Logs
```

---

## 8. TROUBLESHOOTING GUIDE

### Issue: "GOOGLE_GENERATIVE_AI_API_KEY not found"

**Cause**: Environment variable tidak set
**Solution**:
```bash
# Check .env.local exists
ls -la .env.local

# Verify key is set
cat .env.local | grep GOOGLE_GENERATIVE_AI_API_KEY

# If empty, get key dari https://ai.google.dev
```

### Issue: "Supabase connection refused"

**Cause**: DATABASE_URL salah atau network issue
**Solution**:
```bash
# Verify DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin < prisma/migrations.sql

# Check Supabase status
# Visit supabase.com → Check service status
```

### Issue: "Build failed on Vercel"

**Cause**: TypeScript error atau missing dependency
**Solution**:
```bash
# Local build test
npm run build

# Check TypeScript
npx tsc --noEmit

# Check for console errors
npm run dev
# Open browser and check DevTools console

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: "Flashcard generation takes too long"

**Cause**: Google Gemini API rate limited atau slow network
**Solution**:
```bash
# Check API quota
# google.ai.dev → Check usage

# Optimize prompt (make it shorter)
// In lib/ai.ts
const prompt = `...shorter prompt...`;

# Reduce number of cards
generateFlashcards(content, 5) // instead of 10
```

---

## 9. GLOSSARY

| Term | Definition |
|------|-----------|
| **SPA** | Single Page Application - frontend rendered di browser |
| **SSR** | Server-Side Rendering - Next.js feature |
| **API** | Application Programming Interface - backend routes |
| **ORM** | Object Relational Mapping - Prisma untuk database queries |
| **SM-2** | Spaced Repetition Algorithm - untuk optimal learning |
| **JWT** | JSON Web Token - untuk authentication (TBA) |
| **CORS** | Cross-Origin Resource Sharing - security untuk API |
| **CI/CD** | Continuous Integration/Deployment - Vercel auto-deploy |

---

## 10. CONTACT & SUPPORT

**Questions?** Contact:
- 📧 Email: youremail@example.com
- 💻 GitHub: https://github.com/yourusername
- 🌐 Website: https://studyflash-ai.vercel.app

**Support Channels:**
- GitHub Issues: Bug reports & feature requests
- Discord: Community support (TBA)
- Email: Direct contact

---

**Document Version**: 1.0  
**Last Updated**: Januari 2025  
**Next Review**: Maret 2025

---

**END OF SOP DOCUMENT**
