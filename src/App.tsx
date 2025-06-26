import { lazy, Suspense, useState } from 'react';
import AssessmentsPage from './pages/AssessmentsPage';
import { CssBaseline, Box, CircularProgress, Modal } from '@mui/material';
import type { Examinee } from './types/assessment';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { LanguageToggle } from './components/LanguageToggle';

interface ExamineeModalState {
  examinees: Examinee[];
  show: boolean;
}

const MonitorExamineesPage = lazy(() => import('./pages/MonitorExamineesPage'));

function App() {
  const [showExamineeModal, setShowExamineeModal] = useState<ExamineeModalState>({
    examinees: [],
    show: false,
  });

  const createEmotionCache = (direction: 'rtl' | 'ltr') =>
    createCache({
      key: direction === 'rtl' ? 'muirtl' : 'muiltr',
      stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [],
    });

  const closeExamModal = () => {
    setShowExamineeModal({ examinees: [], show: false });
  };
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const theme = createTheme({ direction });
  const cache = createEmotionCache(direction);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <div
            dir="ltr"
            style={{
              padding: '0.1rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <LanguageToggle
              currentDir={direction}
              setDir={setDirection}
              aria-label="Toggle language direction"
            />
          </div>
          <CssBaseline />
          <Box dir={direction}>
            <AssessmentsPage setShowExamineeModal={setShowExamineeModal} />
            <Modal
              open={!!showExamineeModal?.show}
              onClose={closeExamModal}
              aria-labelledby="monitor-examinees-title"
              aria-describedby="monitor-examinees-description"
            >
              <Suspense
                fallback={
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    role="status"
                    aria-live="polite"
                  >
                    <CircularProgress aria-label="Loading content" />
                  </Box>
                }
              >
                <MonitorExamineesPage
                  direction={direction}
                  examinees={showExamineeModal?.examinees}
                  closeMonitorExamModal={closeExamModal}
                />
              </Suspense>
            </Modal>
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;