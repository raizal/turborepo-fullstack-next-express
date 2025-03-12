import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api') || request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path));
  const hasAccessToken = request.cookies.has('access_token');

  if (!isAuthPath && !hasAccessToken) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }
  return NextResponse.next();
}
