import Link from 'next/link';
import { getBooks } from '@/lib/repositories/books.repo';

export const metadata = {
  title: 'Livres — Pr.Anass El Mansouri',
  description: 'Découvrez nos ouvrages et manuels de physique-chimie',
};

export default async function LivresPage() {
  const books = await getBooks();

  return (
    <section id="livres">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Livres &amp; Ouvrages</div>
          <h2>Nos manuels scolaires</h2>
          <p>
            Découvrez nos supports physiques pour vous accompagner dans votre réussite.
            Cliquez sur un livre pour voir les détails et passer commande.
          </p>
        </div>
        <div className="levels">
          {books.map((book) => (
            <Link href={`/livres/${book.slug}`} key={book.id} className="level-card" style={{ display: 'block', textDecoration: 'none' }}>
              {/* Reuse card-like structure but adapted for a book cover */}
              <div style={{ marginBottom: '16px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.cover_image_url} alt={book.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              </div>
              <h3>{book.title}</h3>
              <div className="level-count" style={{ marginTop: '10px' }}>Voir les détails &rarr;</div>
            </Link>
          ))}
          {books.length === 0 && (
            <p>Aucun livre n'est disponible pour le moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}
