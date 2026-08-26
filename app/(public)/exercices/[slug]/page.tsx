import { notFound } from 'next/navigation';
import { getLevelBySlug } from '@/lib/repositories/levels.repo';
import { getExercisesByLevel } from '@/lib/repositories/exercises.repo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const level = await getLevelBySlug(slug);
    return { title: `Exercices ${level.name} — Pr.Anass El Mansouri` };
  } catch (e) {
    return { title: 'Niveau non trouvé' };
  }
}

function getDirectDownloadLink(url: string) {
  try {
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    // Also handle links like ?id=XYZ
    const urlObj = new URL(url);
    const id = urlObj.searchParams.get('id');
    if (id) {
      return `https://drive.google.com/uc?export=download&id=${id}`;
    }
  } catch (e) {
    // Ignore invalid URLs
  }
  return url;
}

export default async function LevelExercisesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let level;
  try {
    level = await getLevelBySlug(slug);
  } catch (e) {
    notFound();
  }

  const exercises = await getExercisesByLevel(level.id);

  return (
    <section id="exercices">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Bibliothèque - {level.name}</div>
          <h2>Exercices &amp; corrigés en PDF</h2>
          <p>
            Tous les fichiers sont hébergés sur Google Drive — un clic pour
            télécharger, aucun compte requis.
          </p>
        </div>
        <div className="lib-shell">
          <div className="lib-toolbar">
            <div className="filters">
              <span className="filter-chip active">Tous les exercices</span>
            </div>
            <div className="search">🔍 {exercises.length} document(s)</div>
          </div>
          <div className="lib-list">
            {exercises.map((ex) => (
              <div className="lib-row" key={ex.id}>
                <div className="lib-ic">PDF</div>
                <div className="lib-info">
                  <b>{ex.title}</b>
                  <span>
                    <span className="lib-tag">{level.name}</span>
                    {ex.description && <span>{ex.description}</span>}
                  </span>
                </div>
                <a href={getDirectDownloadLink(ex.drive_link)} target="_blank" rel="noopener noreferrer" className="lib-dl">
                  ⬇ Télécharger
                </a>
              </div>
            ))}
            {exercises.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-3)' }}>
                Aucun exercice disponible pour ce niveau.
              </div>
            )}
          </div>
          <div className="lib-footer">
            📁 Fichiers synchronisés depuis Google Drive — mis à jour chaque semaine
          </div>
        </div>
      </div>
    </section>
  );
}
