import Link from 'next/link';
import { getLevels } from '@/lib/repositories/levels.repo';

export const metadata = {
  title: 'Contrôles — Pr.Anass El Mansouri',
  description: 'Un parcours par cycle du tronc commun au bac',
};

export default async function ControlesPage() {
  const levels = await getLevels();

  return (
    <section id="niveaux">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Niveaux</div>
          <h2>Contrôles par cycle</h2>
          <p>
            Chaque niveau regroupe les contrôles de physique et de chimie, du tronc
            commun au bac. Cliquez sur un niveau pour accéder à ses ressources.
          </p>
        </div>
        <div className="levels">
          {levels.map((level) => (
            <Link href={`/controles/${level.slug}`} key={level.id} className="level-card" style={{ display: 'block', textDecoration: 'none' }}>
              <h3>{level.name}</h3>
              <div className="level-subjects">
                <span className="pill">Physique</span>
                <span className="pill">Chimie</span>
              </div>
              <div className="level-count">Accéder aux contrôles &rarr;</div>
            </Link>
          ))}
          {levels.length === 0 && (
            <p>Aucun niveau disponible pour le moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
