import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const notifications = [
  {
    id: '1',
    title: 'Film Baru Dirilis!',
    message: 'Shadow Swordsman telah tayang. Stream sekarang!',
    type: 'movie',
    link: '/detail?id=4',
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    title: 'Student Deal Diperbarui',
    message: 'Kuota streaming mahasiswa naik jadi 15 film/bulan!',
    type: 'promo',
    link: '/',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    read: false,
  },
  {
    id: '3',
    title: 'Top Rating Minggu Ini',
    message: 'Fast & Furious: Full Throttle leading with 9.0 rating!',
    type: 'trending',
    link: '/detail?id=5',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    read: false,
  },
  {
    id: '4',
    title: 'Community Picks Update',
    message: 'Film request mahasiswa: "Cyberpunk 2099" masuk dalam antrian.',
    type: 'community',
    link: '/kategori',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    read: true,
  },
];

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, type, link } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newNotif = {
      id: String(notifications.length + 1),
      title,
      message,
      type: type || 'info',
      link: link || '/',
      createdAt: new Date().toISOString(),
      read: false,
    };

    return NextResponse.json(newNotif, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
