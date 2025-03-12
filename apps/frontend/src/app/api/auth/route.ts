import {proxiedRequest} from '@/utils/proxied-request';
import {NextRequest} from 'next/server';

export const POST = (request: NextRequest) => proxiedRequest(request, '/auth/login');
export const DELETE = (request: NextRequest) => proxiedRequest(request, '/auth/logout', 'POST');
export const PUT = (request: NextRequest) => proxiedRequest(request, '/auth/register', 'POST');
