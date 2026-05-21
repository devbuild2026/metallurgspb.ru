import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_INDEXABLE, X_ROBOTS_TAG_BLOCK } from '@/lib/seo';

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // Индексация запрещена флагом SITE_INDEXABLE (lib/seo.ts) или это
  // preview/staging-окружение → HTTP-заголовок X-Robots-Tag: noindex, nofollow.
  const isPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  if (!SITE_INDEXABLE || isPreview) {
    response.headers.set('X-Robots-Tag', X_ROBOTS_TAG_BLOCK);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pages except static files and api
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
