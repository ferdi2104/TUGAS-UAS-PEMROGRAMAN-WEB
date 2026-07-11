import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ownerEmail = process.env.OWNER_EMAIL || 'ferdi2104@students.omb.ac.id';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password || password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existing } = await supabase.auth.admin.listUsers();
  const alreadyExists = existing?.users?.some(u => u.email === ownerEmail);

  if (alreadyExists) {
    return NextResponse.json({ message: 'Owner account already exists', email: ownerEmail });
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: ownerEmail,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Owner', role: 'owner' },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Owner account created', email: ownerEmail, id: data.user?.id });
}
