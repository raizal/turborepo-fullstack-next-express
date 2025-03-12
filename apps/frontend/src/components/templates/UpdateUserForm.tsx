'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card } from '@/components/atoms/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getUserData, updateUserInfo } from '@/store/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingIndicator } from '../molecules/LoadingIndicator';
export default function UpdateUserForm() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isUpdating, isGettingUserData, error } = useSelector((state: RootState) => state.auth);
  
  const [name, setName] = React.useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState<string | null>(null);
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      dispatch(getUserData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && (!name || !phoneNumber)) {
      setName(user.name);
      if (user.phoneNumber) {
        setPhoneNumber(user.phoneNumber);
      }
    }
  }, [user]);


  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!name || !phoneNumber) {
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setPhoneError(true);
      setPhoneErrorMessage('Please enter a valid phone number');
      return;
    }

    const resultAction = await dispatch(updateUserInfo({
      name,
      phoneNumber,
    }));
    if (updateUserInfo.fulfilled.match(resultAction)) {
      router.push('/');
    }
  };

  return (
    <Card variant="outlined">
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Update Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Email</FormLabel>
          <TextField
            id="_email"
            name="_email"
            value={user?.email}
            disabled={true}
            onChange={(e) => setName(e.target.value)}
            placeholder="Email"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            id="name"
            name="name"
            value={name}
            disabled={isGettingUserData || isUpdating}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <TextField
            error={phoneError}
            helperText={phoneErrorMessage}
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            disabled={isGettingUserData || isUpdating}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setPhoneError(false);
              setPhoneErrorMessage('');
            }}
            placeholder="+1234567890"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <LoadingIndicator />
          ) : (
            'Update Profile'
          )}
        </Button>
      </Box>
    </Card>
  );
} 