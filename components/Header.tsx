'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header>
      <div className="nav">
        <Link href="/" className="logo">
          <div className="logo-mark">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path>
              <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"></path>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">Pr. Anass El Mansouri</span>
          </div>
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Accueil</Link>
          <Link href="/#prof" className={pathname === '/#prof' ? 'active' : ''}>Le professeur</Link>
          <Link href="/exercices" className={pathname === '/exercices' ? 'active' : ''}>Exercices</Link>
          <Link href="/resumes" className={pathname === '/resumes' ? 'active' : ''}>Résumés de cours</Link>
          <Link href="/controles" className={pathname === '/controles' ? 'active' : ''}>Contrôles</Link>
          <Link href="/examens" className={pathname === '/examens' ? 'active' : ''}>Examens</Link>
          <Link href="/livres" className={pathname === '/livres' ? 'active' : ''}>Acheter mes livres</Link>

        </nav>
        <div className="nav-cta">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary">Me contacter</Link>
        </div>
      </div>
    </header>
  );
}
