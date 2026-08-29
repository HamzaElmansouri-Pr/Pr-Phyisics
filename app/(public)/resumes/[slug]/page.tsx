import { notFound } from 'next/navigation';
import { getLevelBySlug } from '@/lib/repositories/levels.repo';
import { getResumesByLevel } from '@/lib/repositories/resumes.repo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const level = await getLevelBySlug(slug);
    return { title: `Résumés ${level.name} — Pr.Anass El Mansouri` };
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

export default async function LevelResumesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let level;
  try {
    level = await getLevelBySlug(slug);
  } catch (e) {
    notFound();
  }

  const resumes = await getResumesByLevel(level.id);

  return (
    <section id="exercices">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Bibliothèque - {level.name}</div>
          <h2>Résumés de cours en PDF</h2>
          <p>
            Tous les fichiers sont hébergés sur Google Drive — un clic pour
            télécharger, aucun compte requis.
          </p>
        </div>
        <div className="lib-shell">
          <div className="lib-toolbar">
            <div className="filters">
              <span className="filter-chip active">Tous les résumés</span>
            </div>
            <div className="search">🔍 {resumes.length} document(s)</div>
          </div>
          <div className="lib-list">
            {resumes.map((r) => (
              <div className="lib-row" key={r.id}>
                <div className="lib-ic">PDF</div>
                <div className="lib-info">
                  <b>{r.title}</b>
                  <span>
                    <span className="lib-tag">{level.name}</span>
                    {r.description && <span>{r.description}</span>}
                  </span>
                </div>
                <a href={getDirectDownloadLink(r.drive_link)} target="_blank" rel="noopener noreferrer" className="lib-dl">
                  ⬇ Télécharger
                </a>
              </div>
            ))}
            {resumes.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-3)' }}>
                Aucun résumé disponible pour ce niveau.
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
