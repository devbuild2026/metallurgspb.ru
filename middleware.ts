import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Preview/staging deployments — noindex,nofollow
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv && vercelEnv !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pages except static files and api
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
