'use client';

import { Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function NotFound() {
  const pathname = usePathname();
  return (
    <main>
      <Box sx={{ textAlign: 'center' }}>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <RiAlarmWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1>Page Not Found</h1>
          {/* <div>{window.location.href} NOT exists</div> */}
          <div>{pathname} NOT exists</div>
          <h5>change this in app/not-found.tsx</h5>
          <Link href='/'>Back to home</Link>
          <div>
            <img
              src='https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7922.jpg'
              alt='404'
            />
          </div>
        </div>
      </Box>
    </main>
  );
}
