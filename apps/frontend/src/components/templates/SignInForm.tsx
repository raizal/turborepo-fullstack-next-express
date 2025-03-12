'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {Card} from '@/components/atoms/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { signIn } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { LoadingIndicator } from '../molecules/LoadingIndicator';

export default function SignInForm() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  
    const handleClickOpen = () => {
    };
  
    const handleSubmit = async () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
      if (!validateInputs()) {
        return;
      }

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const resultAction = await dispatch(signIn(credentials));
      if (signIn.fulfilled.match(resultAction)) {
        router.replace('/');
      } else {
        console.error('Login failed:', resultAction.error);
      }
    };
  
    const validateInputs = () => {
      const email = document.getElementById('email') as HTMLInputElement;
      const password = document.getElementById('password') as HTMLInputElement;
  
      let isValid = true;
  
      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage('Please enter a valid email address.');
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage('');
      }
  
      if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage('Password must be at least 6 characters long.');
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
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
            Sign in
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl disabled={loading}>
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
            <FormControl disabled={loading}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{ position: 'relative' }}
            >
              {loading ? (
                <LoadingIndicator />
              ) : (
                'Sign in'
              )}
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/signup/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
    )
}