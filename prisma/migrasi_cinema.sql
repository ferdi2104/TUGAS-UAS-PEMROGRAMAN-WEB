-- ============================================
-- NEON-ACTION CINEMA - Database Tables
-- Jalankan SQL ini di Supabase SQL Editor
-- https://supabase.com/dashboard/project/dwhbhucfylqgfbktynwt/sql/new
-- ============================================

-- 1. Movies table
CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  year INT NOT NULL,
  runtime TEXT NOT NULL,
  rating FLOAT NOT NULL DEFAULT 0,
  genre TEXT NOT NULL,
  subgenre TEXT,
  "imageUrl" TEXT NOT NULL,
  videoUrl TEXT,
  tag TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 2. Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "movieId" UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INT NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 3. Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  color TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 4. Enable Row Level Security (opsional)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 5. Allow public read access
CREATE POLICY "Public read access for movies" ON movies FOR SELECT USING (true);
CREATE POLICY "Public read access for comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);

-- 6. Allow insert for comments (anon)
CREATE POLICY "Anon can insert comments" ON comments FOR INSERT WITH CHECK (true);
