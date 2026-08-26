'use client';

import { useState } from 'react';
import { createBookAction, updateBookAction, deleteBookAction } from './actions';

export default function BookForm({ books }: { books: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [whatsappMsg, setWhatsappMsg] = useState('');
  const [existingCoverUrl, setExistingCoverUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [whatsappManuallyEdited, setWhatsappManuallyEdited] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (!slugManuallyEdited) {
      const generatedSlug = newTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9]+/g, '-')     
        .replace(/(^-|-$)/g, '');        
      setSlug(generatedSlug);
    }

    if (!whatsappManuallyEdited) {
      setWhatsappMsg(`Bonjour, je souhaite commander le livre "${newTitle}".`);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsappMsg(e.target.value);
    setWhatsappManuallyEdited(true);
  };

  const startEdit = (book: any) => {
    setEditingId(book.id);
    setTitle(book.title);
    setSlug(book.slug);
    setDescription(book.description || '');
    setPrice(book.price ? book.price.toString() : '');
    
    const defaultMsg = `Bonjour, je souhaite commander le livre "${book.title}".`;
    setWhatsappMsg(book.whatsapp_message || defaultMsg);
    setExistingCoverUrl(book.cover_image_url);
    setIsAvailable(book.is_available ?? true);
    setSlugManuallyEdited(false);
    setWhatsappManuallyEdited(!!book.whatsapp_message && book.whatsapp_message !== defaultMsg);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setPrice('');
    setWhatsappMsg('');
    setExistingCoverUrl('');
    setIsAvailable(true);
    setSlugManuallyEdited(false);
    setWhatsappManuallyEdited(false);
    setError('');
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    if (editingId && existingCoverUrl) {
      formData.append('existing_cover_url', existingCoverUrl);
    }
    
    const result = editingId 
      ? await updateBookAction(editingId, formData)
      : await createBookAction(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      (e.target as HTMLFormElement).reset();
      cancelEdit();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      await deleteBookAction(id);
    }
  }

  return (
    <div className="admin-content-gap">
      <form onSubmit={handleSubmit} className="admin-form-card">
        <h2 className="admin-form-title">{editingId ? 'Éditer le livre' : 'Ajouter un livre'}</h2>
        {error && <div className="admin-form-error">{error}</div>}
        
        <div className="admin-form-row">
          <div>
            <label className="admin-label">Titre</label>
            <input name="title" value={title} onChange={handleTitleChange} required className="admin-input" placeholder="Titre du livre" />
          </div>
          <div>
            <label className="admin-label">Slug (URL)</label>
            <input name="slug" value={slug} onChange={handleSlugChange} required className="admin-input" placeholder="ex: mon-livre" />
          </div>
        </div>

        <div className="admin-form-row">
          <div>
            <label className="admin-label">Prix (DH) - Optionnel</label>
            <input name="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="admin-input" placeholder="ex: 150" />
          </div>
          <div>
            <label className="admin-label">Message WhatsApp (Optionnel)</label>
            <input name="whatsapp_message" value={whatsappMsg} onChange={handleWhatsappChange} className="admin-input" placeholder="Bonjour, je souhaite commander..." />
          </div>
        </div>
        
        <div className="admin-form-group">
          <label className="admin-label">Description (Optionnel)</label>
          <textarea name="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input" placeholder="Description détaillée..." />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Image de couverture (2Mo max)</label>
          {editingId && existingCoverUrl && (
            <div className="admin-cover-preview">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={existingCoverUrl} alt="Cover" />
              <span>Laissez vide pour conserver l&apos;image actuelle</span>
            </div>
          )}
          <input name="cover_image" type="file" accept="image/jpeg, image/png, image/webp, image/gif" required={!editingId} className="admin-input" />
          <div className="admin-hint">Le fichier sera analysé sur le serveur pour vérifier son format et son poids.</div>
        </div>
        
        <div className="admin-checkbox-row">
          <input type="checkbox" name="is_available" id="is_available" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
          <label htmlFor="is_available">Ce livre est disponible (en stock / à l&apos;achat)</label>
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Créer le livre')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={loading} className="btn btn-outline">
              Annuler
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="admin-section-title">Livres existants</h2>
        
        {/* Desktop table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>Image</th>
                <th>Titre</th>
                <th style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.cover_image_url} alt={book.title} className="cover-thumb" />
                  </td>
                  <td className="cell-title">{book.title}</td>
                  <td>
                    <div className="cell-actions">
                      <button onClick={() => startEdit(book)} className="admin-btn-edit">
                        Éditer
                      </button>
                      <button onClick={() => handleDelete(book.id)} className="admin-btn-delete">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={3} className="admin-table-empty">
                    Aucun livre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="admin-card-list">
          {books.map((book) => (
            <div key={book.id} className="admin-card-item">
              <div className="admin-card-item-header">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={book.cover_image_url} alt={book.title} />
                <span className="item-title">{book.title}</span>
              </div>
              {(book.price || book.description) && (
                <div className="admin-card-item-body">
                  {book.price && (
                    <div className="field">
                      <span className="field-label">Prix</span>
                      <span className="field-value">{book.price} DH</span>
                    </div>
                  )}
                  {book.description && (
                    <div className="field">
                      <span className="field-label">Desc.</span>
                      <span className="field-value">{book.description}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="admin-card-item-actions">
                <button onClick={() => startEdit(book)} className="admin-btn-edit">
                  Éditer
                </button>
                <button onClick={() => handleDelete(book.id)} className="admin-btn-delete">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {books.length === 0 && (
            <div className="admin-card-empty">Aucun livre.</div>
          )}
        </div>
      </div>
    </div>
  );
}
