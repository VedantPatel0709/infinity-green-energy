import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return res;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const token = req.cookies.get('sb-access-token')?.value;
  const { pathname } = req.nextUrl;

  if (!token && (pathname.startsWith('/portal') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*'],
};
