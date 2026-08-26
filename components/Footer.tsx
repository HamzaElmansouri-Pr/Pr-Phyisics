import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo">
              <div className="logo-mark">PC</div>
              Pr. El Amrani
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
            <Link href="/exercices">Cours vidéo</Link>
            <Link href="/exercices">Exercices PDF</Link>
            <Link href="/livres">Livres</Link>
          </div>
          <div className="foot-col">
            <b>Contact</b>
            <a href="mailto:contact@profphysique.ma">contact@profphysique.ma</a>
            <a href="tel:+212600000000">+212 6 00 00 00 00</a>
            <span>Rabat, Maroc</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Pr. Anass El Mansouri — Physique-Chimie. Tous droits réservés.</span>
          <div className="socials">
            <a href="#">f</a><a href="#">in</a><a href="#">yt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
