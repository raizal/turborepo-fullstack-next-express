import { NextResponse, NextRequest } from 'next/server';
import {cookies} from 'next/headers'
import fetch from 'node-fetch';
import { API_URL } from '@/constants';
import { ApiResponse } from '@repo/entity';

export async function proxiedRequest(request: NextRequest, path: string, method?: string) {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('access_token')?.value;
    const apiUrl = API_URL +'/api'+ path; // Forward the request to the API URL

    const response = await fetch(apiUrl, {
        method: method || request.method,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: request.body ? await request.text() : null,
    });
    const responseBody = response.headers.get('Content-type')?.includes('json')
        ? await response.json() as ApiResponse<{token?: string}> : await response.text();

    if (response.status !== 200) {
        if (response.status in [401, 403]) {
            cookiesStore.delete('access_token');
        }
        return NextResponse.json(responseBody, { status: response.status });
    }

    // Check if the response contains a new access token
    if (typeof responseBody !== 'string' && 'data' in responseBody && responseBody.data?.token) {
        // Set the new access token in the cookie (ensure it's encrypted)
        cookiesStore.set('access_token', responseBody.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        delete responseBody.data.token;
    }

    return NextResponse.json(responseBody, { status: response.status });
}