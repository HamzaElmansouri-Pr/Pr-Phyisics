import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/repositories/books.repo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const book = await getBookBySlug(slug);
    return { title: `${book.title} — Pr.Anass El Mansouri` };
  } catch (e) {
    return { title: 'Livre non trouvé' };
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let book;
  try {
    book = await getBookBySlug(slug);
  } catch (e) {
    notFound();
  }

  const defaultWhatsappMessage = `Bonjour, je souhaite commander le livre "${book.title}".`;
  const whatsappMessage = encodeURIComponent(book.whatsapp_message || defaultWhatsappMessage);
  const phoneNumber = '+212600000000'; // Placeholder phone number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <section id="livre-detail">
      <div className="wrap prof-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="photo-frame" style={{ border: 'none', padding: 0, overflow: 'hidden', height: 'auto', background: 'transparent' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={book.cover_image_url} 
              alt={book.title} 
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} 
            />
          </div>
          {book.book_images && book.book_images.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {book.book_images.map((img: any) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  key={img.id}
                  src={img.image_url} 
                  alt={`${book.title} gallery`} 
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-soft)' }} 
                />
              ))}
            </div>
          )}
        </div>
        <div className="prof-copy">
          <div style={{ marginBottom: '16px' }}>
            {book.is_available !== false ? (
              <span style={{ background: '#e6f4ea', color: '#137333', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 600, display: 'inline-block' }}>
                ✅ Disponible
              </span>
            ) : (
              <span style={{ background: '#fce8e6', color: '#c5221f', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 600, display: 'inline-block' }}>
                ❌ Indisponible
              </span>
            )}
          </div>
          <h2>{book.title}</h2>
          
          {book.price !== null && book.price !== undefined && (
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--blue)', marginBottom: '16px' }}>
              {book.price} DH
            </div>
          )}
          
          <div style={{ color: 'var(--text-2)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
            {book.description || 'Aucune description disponible pour ce livre.'}
          </div>
          
          <div style={{ marginTop: '32px' }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '14px 24px', fontSize: '15px', marginRight: '16px' }}>
              <span className="ic" style={{ marginRight: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              Commander via WhatsApp
            </a>
            {book.extract_link && (
              <a href={book.extract_link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '14px 24px', fontSize: '15px' }}>
                <span className="ic" style={{ marginRight: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </span>
                {book.extract_title || "Voir l'extrait"}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
