import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import { ReduxProvider } from '@/components/organism/ReduxProvider';
import { GLOBAL_STYLES } from '@/styles';
import { ToastProvider } from '@/components/organism/ToastProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body>
        <ReduxProvider>
          <ToastProvider>
            <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
