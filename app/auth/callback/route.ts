import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const rawNext = requestUrl.searchParams.get('next') ?? '/admin/dashboard';
  // Prevent open redirect: only allow relative paths, block protocol-relative URLs
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/admin/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Successfully exchanged the code for a session
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Return the user to an error page or login with some error instructions
  return NextResponse.redirect(new URL('/admin/login?error=Invalid_Token', requestUrl.origin));
}
