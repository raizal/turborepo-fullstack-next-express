import { proxiedRequest } from '@/utils/proxied-request';
import { NextRequest } from 'next/server';

export const GET = (request: NextRequest) => proxiedRequest(request, '/user/fetch-user-data');
export const POST = (request: NextRequest) => proxiedRequest(request, '/user/update-user-data');
