'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Card } from '@/components/atoms/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { signUp } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/organism/ToastProvider';
import { LoadingIndicator } from '../molecules/LoadingIndicator';

export default function SignupForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { showToast } = useToast();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      if (!validateInputs()) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const credentials = {
        email: data.get('email') as string,
        password: data.get('password') as string,
      };

      const resultAction = await dispatch(signUp(credentials));
      if (signUp.fulfilled.match(resultAction)) {
        showToast('Registration successful! Please check your email for verification.', 'success');
        router.push('/login');
      }
    };
  
    const validateInputs = () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      const passwordConfirm = document.getElementById('passwordconfirm') as HTMLInputElement;
  
      let isValid = true;
  
      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }
      

      setPasswordError(false);
      setPasswordErrorMessage('');

      if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage('Password must be at least 6 characters long.');
        isValid = false;
      }

      if (password.value !== passwordConfirm.value) {
        setPasswordError(true);
        setPasswordErrorMessage('Passwords do not match.');
        isValid = false;
      }
  
      return isValid;
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
            Sign up
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <TextField
                name="passwordconfirm"
                placeholder="••••••"
                type="password"
                id="passwordconfirm"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ position: 'relative' }}
            >
              {loading ? (
                <LoadingIndicator />
              ) : (
                'Sign up'
              )}
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
    )
}