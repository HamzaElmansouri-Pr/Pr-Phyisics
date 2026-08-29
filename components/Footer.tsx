import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo">
              <div className="logo-mark">PC</div>
              Pr. EL Mansouri Anass
            </div>
            <p>
              Cours et exercices de physique-chimie pour les lycéens marocains,
              du tronc commun au bac.
            </p>
          </div>
          <div className="foot-col">
            <b>Niveaux</b>
            <Link href="/exercices">Tronc commun</Link>
            <Link href="/exercices">1ère année Bac</Link>
            <Link href="/exercices">2ème année Bac</Link>
          </div>
          <div className="foot-col">
            <b>Ressources</b>
            <Link href="/exercices">Exercices</Link>
            <Link href="/resumes">Résumés de cours</Link>
            <Link href="/controles">Contrôles</Link>
            <Link href="/examens">Examens</Link>
            <Link href="/livres">Livres</Link>
          </div>
          <div className="foot-col">
            <b>Contact</b>
            <a href="mailto:Profanaselmansouri@gmail.com">Profanaselmansouri@gmail.com</a>
            <span>Taza, Maroc</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Pr. Anass El Mansouri — Physique-Chimie. Tous droits réservés.</span>
          <div className="socials">
            <a href="https://instagram.com/profphysique.ma" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
