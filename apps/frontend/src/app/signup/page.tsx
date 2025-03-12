'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {SignInContainer} from '../../components/atoms/Card';
import SignUpForm from '../../components/templates/SignupForm';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';

export default function SignUp() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <SignUpForm />
      </SignInContainer>
    </AppTheme>
  );
}
