'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
          <div className="logo-mark">PC</div>
          Pr.Anass El Mansouri
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
          <Link href="/exercices" className={pathname === '/exercices' ? 'active' : ''}>Cours & Exercices</Link>
          <Link href="/livres" className={pathname === '/livres' ? 'active' : ''}>Livres</Link>
          <Link href="/#contact" className={pathname === '/#contact' ? 'active' : ''}>Contact</Link>
        </nav>
        <div className="nav-cta">
          <Link href="/#contact" className="btn btn-primary">Me contacter</Link>
        </div>
      </div>
    </header>
  );
}
