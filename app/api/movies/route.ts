import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const featured = searchParams.get('featured');
  const trending = searchParams.get('trending');
  const genre = searchParams.get('genre');

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

    if (genre) {
      const { data, error } = await supabase.from('movies').select('*').eq('genre', genre).order('rating', { ascending: false });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    const { data, error } = await supabase.from('movies').select('*').order('createdAt', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
