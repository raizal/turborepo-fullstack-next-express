export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = process.env.NODE_ENV === 'development';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
