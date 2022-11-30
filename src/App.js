import React from 'react';
// routes
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import MainPage from './components/sidebar/MainPage';
// import Navbar from './components/sidebar/Navbar';
// import Words from './pages/admin/Words';
// import Tags from './pages/admin/Tags';
// import Categories from './pages/admin/Categories';

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
