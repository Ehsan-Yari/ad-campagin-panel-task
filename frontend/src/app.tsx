import 'src/global.css';

import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { usePathname } from 'src/routes/hooks';

import { queryClient } from 'src/queryClient';
import { themeConfig, ThemeProvider } from 'src/theme';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider defaultSettings={defaultSettings}>
        <ThemeProvider
          modeStorageKey={themeConfig.modeStorageKey}
          defaultMode={themeConfig.defaultMode}
        >
          <MotionLazy>
            <Snackbar />
            <ProgressBar />
            <SettingsDrawer defaultSettings={defaultSettings} />
            {children}
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
