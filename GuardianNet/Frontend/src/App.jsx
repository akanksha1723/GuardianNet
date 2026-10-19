import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar            from './module1/components/layout/Navbar';
import Footer            from './module1/components/layout/Footer';
import FloatingSOSButton from './module1/components/layout/FloatingSOSButton';
import AppRoutes         from './routes/AppRoutes';

// Pages that have their own header — no global Navbar/Footer
const HIDE_NAV_PREFIXES = [
  '/login',
  '/register',
  '/user/',
  '/volunteer/',
  '/admin/',
  '/emergency',
  '/history',
  '/welcome',   // has its own topbar
];

export default function App() {
  const location = useLocation();
  const hideNav  = HIDE_NAV_PREFIXES.some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  return (
    <>
      {!hideNav && <Navbar />}
      <main><AppRoutes /></main>
      {!hideNav && <Footer />}
      {!hideNav && <FloatingSOSButton />}
    </>
  );
}