import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShield, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', hash: '#home' },
  { label: 'Features', hash: '#features' },
  { label: 'How It Works', hash: '#how-it-works' },
  { label: 'Emergency Categories', hash: '#categories' },
  { label: 'FAQ', hash: '#faq' },
  { label: 'Contact', hash: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  function handleNavClick(hash) {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a tick for the landing page to mount before scrolling.
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className={`gn-navbar gn-glass ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="gn-container gn-navbar-inner" aria-label="Primary navigation">
        <Link to="/" className="gn-brand" onClick={() => setIsOpen(false)}>
          <span className="gn-brand-icon">
            <FiShield />
          </span>
          <span className="gn-brand-text">
            Guardian<span className="gn-brand-accent">Net</span>
          </span>
        </Link>

        <button
          type="button"
          className="gn-navbar-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`gn-navbar-links ${isOpen ? 'is-open' : ''}`}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.hash}>
                <button type="button" onClick={() => handleNavClick(link.hash)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="gn-navbar-actions">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="gn-btn gn-btn-ghost" onClick={() => setIsOpen(false)}>
                  Hi, {user?.name?.split(' ')[0] || 'there'}
                </Link>
                <button type="button" className="gn-btn gn-btn-ghost" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="gn-btn gn-btn-ghost" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
                <Link to="/register" className="gn-btn gn-btn-primary" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
