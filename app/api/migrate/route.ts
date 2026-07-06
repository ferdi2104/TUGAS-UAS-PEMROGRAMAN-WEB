import { NextRequest, NextResponse } from 'next/server';

const { Pool } = require('pg');

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET || 'dev-secret'}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: string[] = [];

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });

    const client = await pool.connect();
    results.push('Connected to database');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.movies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        year INTEGER NOT NULL,
        genre TEXT NOT NULL,
        poster_url TEXT,
        backdrop_url TEXT,
        rating NUMERIC(3,1),
        duration TEXT,
        synopsis TEXT,
        featured BOOLEAN DEFAULT false,
        trending BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    results.push('Table movies created');

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.comments (
        id SERIAL PRIMARY KEY,
        movie_id INTEGER REFERENCES public.movies(id) ON DELETE CASCADE,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        avatar TEXT,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    results.push('Table comments created');

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        icon TEXT,
        color TEXT,
        movie_count INTEGER DEFAULT 0
      );
    `);
    results.push('Table categories created');

    // Enable RLS
    await client.query('ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;');
    await client.query('ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;');
    results.push('RLS enabled');

    // Seed categories
    const catRes = await client.query(`
      INSERT INTO public.categories (name, slug, description, icon, color, movie_count) VALUES
        ('Action', 'action', 'Non-stop adrenaline and explosive stunts', 'bolt', '#ff2d78', 3),
        ('Horror', 'horror', 'Heart-pounding terror and supernatural suspense', 'dangerous', '#7c3aed', 2),
        ('Sci-Fi', 'sci-fi', 'Mind-bending futures and cosmic adventures', 'rocket_launch', '#00ffcc', 2),
        ('Drama', 'drama', 'Powerful storytelling and emotional depth', 'theater_comedy', '#ffe04a', 2),
        ('Comedy', 'comedy', 'Laugh-out-loud moments and witty humor', 'celebration', '#ff6b35', 2),
        ('Anime', 'anime', 'Japanese animation at its finest', 'stadia_controller', '#e040fb', 1),
        ('Thriller', 'thriller', 'Edge-of-your-seat tension and twists', 'visibility', '#00bcd4', 2),
        ('Adventure', 'adventure', 'Epic journeys and daring quests', 'explore', '#4caf50', 2)
      ON CONFLICT (slug) DO NOTHING
      RETURNING id, name;
    `);
    results.push(`Seeded ${catRes.rowCount} categories`);

    // Seed movies
    const movieRes = await client.query(`
      INSERT INTO public.movies (title, year, genre, poster_url, backdrop_url, rating, duration, synopsis, featured, trending) VALUES
        ('Neon Genesis', 2024, 'Sci-Fi', '/images/neon-genesis-poster.svg', '/images/neon-genesis-bg.svg', 8.9, '2h 28m', 'In a world where reality and virtual consciousness merge, a young hacker discovers a hidden dimension that threatens to unravel the fabric of existence itself.', true, true),
        ('Shadow Protocol', 2024, 'Action', '/images/shadow-protocol-poster.svg', '/images/shadow-protocol-bg.svg', 8.7, '2h 15m', 'An elite covert operative must navigate a web of international conspiracy when a rogue AI takes control of global defense systems.', true, true),
        ('Crimson Dawn', 2024, 'Horror', '/images/crimson-dawn-poster.svg', '/images/crimson-dawn-bg.svg', 8.5, '1h 55m', 'When a family moves into a Victorian mansion, they unknowingly awaken an ancient entity that feeds on their deepest fears.', true, false),
        ('Digital Horizons', 2024, 'Sci-Fi', '/images/digital-horizons-poster.svg', '/images/digital-horizons-bg.svg', 8.8, '2h 32m', 'A brilliant scientist creates a digital universe where consciousness can be uploaded, but discovers a dark secret within the code.', false, true),
        ('Thunder Squad', 2024, 'Action', '/images/thunder-squad-poster.svg', '/images/thunder-squad-bg.svg', 8.6, '2h 05m', 'A team of misfit heroes with extraordinary abilities must unite to stop a catastrophic threat from another dimension.', false, true),
        ('The Haunting', 2024, 'Horror', '/images/the-haunting-poster.svg', '/images/the-haunting-bg.svg', 8.4, '1h 48m', 'A documentary crew investigates an abandoned asylum, only to discover that some doors should never be opened.', false, false),
        ('Night Watch', 2024, 'Action', '/images/night-watch-poster.svg', '/images/night-watch-bg.svg', 8.3, '2h 20m', 'A vigilante operating in the shadows of a corrupt metropolis becomes the city''s only hope against a ruthless crime syndicate.', false, true),
        ('Apex Predator', 2024, 'Thriller', '/images/apex-predator-poster.svg', '/images/apex-predator-bg.svg', 8.6, '2h 10m', 'A wildlife photographer stranded in a remote jungle must survive against a genetically engineered predator.', false, false)
      ON CONFLICT (id) DO NOTHING
      RETURNING id, title;
    `);
    results.push(`Seeded ${movieRes.rowCount} movies`);

    // Seed comments
    const commRes = await client.query(`
      INSERT INTO public.comments (movie_id, author, content, avatar, likes) VALUES
        (1, 'CyberPunk99', 'The visual effects in this movie are absolutely mind-blowing!', '/images/avatar-1.svg', 245),
        (1, 'MovieBuff42', 'A masterpiece of modern cinema.', '/images/avatar-2.svg', 189),
        (2, 'ActionJunkie', 'Best action sequences of the year!', '/images/avatar-3.svg', 312)
      ON CONFLICT (id) DO NOTHING;
    `);
    results.push(`Seeded ${commRes.rowCount} comments`);

    client.release();
    await pool.end();

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    results.push(`Error: ${error.message}`);
    return NextResponse.json({ success: false, results, error: error.message });
  }
}
