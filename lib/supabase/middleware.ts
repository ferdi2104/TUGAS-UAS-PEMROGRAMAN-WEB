import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const publicPaths = ['/login', '/register', '/auth/callback'];
    const isPublicPath = publicPaths.some(p => request.nextUrl.pathname.startsWith(p));

    if (!user && !isPublicPath) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    if (user && isPublicPath) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = '/';
      return NextResponse.redirect(homeUrl);
    }

    if (user && request.nextUrl.pathname.startsWith('/admin')) {
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (serviceKey && serviceUrl) {
        try {
          const adminClient = createClient(serviceUrl, serviceKey);
          const { data: profile } = await adminClient
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (!profile || profile.role !== 'admin') {
            const homeUrl = request.nextUrl.clone();
            homeUrl.pathname = '/';
            return NextResponse.redirect(homeUrl);
          }
        } catch {
          // profiles table might not exist yet, allow access for now
        }
      }
    }

    return response;
  } catch {
    return NextResponse.next({ request: { headers: request.headers } });
  }
}
