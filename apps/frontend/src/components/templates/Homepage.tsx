'use client';
import { getUserData, logout } from '@/store/auth';
import { AppDispatch } from '@/store/store';
import { Box, Button, Card } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Homepage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(getUserData());
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout())
    .then(() => {
      router.replace('/login');
    })
    .catch((error) => {
      console.error('Logout failed:', error);
    });
  }, [dispatch]);

  return (
    <main>
      <Card variant="outlined">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ m: 5 }}>
              <h1>Welcome {user?.name}</h1>
              <p>Email: {user?.email}</p>
              <p>Phone Number: {user?.phoneNumber}</p>
              <Link href="/profile">Update Profile</Link>
            </Box>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Card>
    </main>
  );
}
export default Homepage;