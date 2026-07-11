import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'ferdi2104@students.omb.ac.id';

function getClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

async function verifyOwner(request: NextRequest): Promise<boolean> {
  if (!supabaseUrl || !serviceRoleKey) return false;
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  const adminClient = createClient(supabaseUrl, serviceRoleKey);
  const { data: { user } } = await adminClient.auth.getUser(token);
  return user?.email === OWNER_EMAIL;
}

export async function POST(request: NextRequest) {
  const isOwner = await verifyOwner(request);
  if (!isOwner) {
    return NextResponse.json({ error: 'Only the owner can add movies' }, { status: 403 });
  }

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
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isOwner = await verifyOwner(request);
  if (!isOwner) {
    return NextResponse.json({ error: 'Only the owner can edit movies' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { title, description, year, runtime, rating, genre, subgenre, imageUrl, videoUrl, tag, featured } = body;

    const updates: Record<string, unknown> = {};
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (year) updates.year = year;
    if (runtime) updates.runtime = runtime;
    if (rating) updates.rating = rating;
    if (genre) updates.genre = genre;
    if (subgenre !== undefined) updates.subgenre = subgenre;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (videoUrl !== undefined) updates.videoUrl = videoUrl;
    if (tag !== undefined) updates.tag = tag;
    if (featured !== undefined) updates.featured = featured;

    const { data, error } = await supabase
      .from('movies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const isOwner = await verifyOwner(request);
  if (!isOwner) {
    return NextResponse.json({ error: 'Only the owner can delete movies' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    const { error } = await supabase.from('movies').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const featured = searchParams.get('featured');
  const trending = searchParams.get('trending');
  const genre = searchParams.get('genre');
  const search = searchParams.get('search');
  const yearFrom = searchParams.get('yearFrom');
  const yearTo = searchParams.get('yearTo');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '12') || 12));

  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    if (id) {
      const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
      if (error) return NextResponse.json({ error: error.message }, { status: 404 });
      return NextResponse.json(data);
    }

    if (featured === 'true') {
      const { data, error } = await supabase.from('movies').select('*').eq('featured', true).limit(1).single();
      if (error) return NextResponse.json({ error: 'No featured movie found' }, { status: 404 });
      return NextResponse.json(data);
    }

    if (trending === 'true') {
      const { data, error } = await supabase.from('movies').select('*').order('rating', { ascending: false }).limit(5);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    let query = supabase.from('movies').select('*', { count: 'exact' });

    if (search) {
      const safeSearch = search.replace(/[\\%()]/g, '');
      if (safeSearch) {
        query = query.or(`title.ilike.%${safeSearch}%,description.ilike.%${safeSearch}%`);
      }
    }

    if (genre) {
      query = query.eq('genre', genre);
    }

    if (yearFrom) {
      const fromYear = parseInt(yearFrom);
      if (!isNaN(fromYear)) query = query.gte('year', fromYear);
    }

    if (yearTo) {
      const toYear = parseInt(yearTo);
      if (!isNaN(toYear)) query = query.lte('year', toYear);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('createdAt', { ascending: false })
      .range(from, to);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data, total: count || 0, page, limit });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
