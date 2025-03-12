'use client';
import { SignInContainer } from '@/components/atoms/Card';
import Homepage from '@/components/templates/Homepage';
import { store } from '@/store';
import AppTheme from '@/theme/AppTheme';
import ColorModeSelect from '@/theme/ColorModeSelect';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

const AppHome = async () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <SignInContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Homepage />
        </SignInContainer>
      </Provider>
    </AppTheme>
  );
};

export default AppHome;
