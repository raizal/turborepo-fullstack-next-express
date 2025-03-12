/* eslint-disable @next/next/no-img-element */
'use client'; // Error components must be Client Components

import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button } from '@mui/material';
import * as React from 'react';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <section>
        <Box sx={{ textAlign: 'center' }}>
          <WarningIcon />
          <h1>Oops, something went wrong!</h1>
          <h5>change this in app/error.tsx</h5>
          <h4>{error.message}</h4>
          <Box sx={{ m: 5 }}>
            <Button onClick={reset}>Try again</Button>
          </Box>
          <Link href='/'>Back to home</Link>
          <div>
            <img
              src='https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-1905.jpg'
              alt='500'
            />
          </div>
        </Box>
      </section>
    </main>
  );
}
