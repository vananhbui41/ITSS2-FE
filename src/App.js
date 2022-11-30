import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import MainPage from './components/sidebar/MainPage';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <div>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        {/* <Router /> */}
      </ThemeProvider>
        <MainPage />
    </div>
  );
}
