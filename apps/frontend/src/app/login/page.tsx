'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {SignInContainer} from '../../components/atoms/Card';
import SignInForm from '../../components/templates/SignInForm';
import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { store } from '../../store';
import { Provider } from 'react-redux';

export default function SignIn() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <SignInContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <SignInForm />
        </SignInContainer>
      </Provider>
    </AppTheme>
  );
}
