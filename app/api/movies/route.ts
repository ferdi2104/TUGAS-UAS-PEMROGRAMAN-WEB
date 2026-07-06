import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function getClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function POST(request: NextRequest) {
  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { title, description, year, runtime, rating, genre, subgenre, imageUrl, videoUrl, tag, featured } = body;

    if (!title || !description || !genre) {
      return NextResponse.json({ error: 'Title, description, and genre are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('movies')
      .insert([{
        title, description,
        year: year || new Date().getFullYear(),
        runtime: runtime || '120 Mins',
        rating: rating || 7.0,
        genre,
        subgenre: subgenre || null,
        imageUrl: imageUrl || '',
        videoUrl: videoUrl || null,
        tag: tag || null,
        featured: featured || false,
      }])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const featured = searchParams.get('featured');
  const trending = searchParams.get('trending');
  const genre = searchParams.get('genre');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    if (id) {
      const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 404 });
      return NextResponse.json(data);
    }

    if (featured === 'true') {
      const { data, error } = await supabase.from('movies').select('*').eq('featured', true).limit(1).single();
      if (error) return NextResponse.json(null);
      return NextResponse.json(data);
    }

    if (trending === 'true') {
      const { data, error } = await supabase.from('movies').select('*').order('rating', { ascending: false }).limit(5);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    let query = supabase.from('movies').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (genre) {
      query = query.eq('genre', genre);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('createdAt', { ascending: false })
      .range(from, to);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, total: count || 0, page, limit });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
