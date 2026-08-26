'use client';

import { useState } from 'react';
import { createLevelAction, updateLevelAction, deleteLevelAction } from './actions';

export default function LevelForm({ levels }: { levels: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [order, setOrder] = useState<number>(0);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!slugManuallyEdited) {
      const generatedSlug = newName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9]+/g, '-')     
        .replace(/(^-|-$)/g, '');        
      setSlug(generatedSlug);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  };

  const startEdit = (level: any) => {
    setEditingId(level.id);
    setName(level.name);
    setSlug(level.slug);
    setOrder(level.order);
    setSlugManuallyEdited(false); // Allow auto-generation even when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setSlug('');
    setOrder(0);
    setSlugManuallyEdited(false);
    setError('');
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = editingId 
      ? await updateLevelAction(editingId, formData)
      : await createLevelAction(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      cancelEdit();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce niveau ?')) {
      await deleteLevelAction(id);
    }
  }

  return (
    <div className="admin-content-gap">
      <form onSubmit={handleSubmit} className="admin-form-card">
        <h2 className="admin-form-title">{editingId ? 'Éditer le niveau' : 'Ajouter un niveau'}</h2>
        {error && <div className="admin-form-error">{error}</div>}
        
        <div className="admin-form-row">
          <div>
            <label className="admin-label">Nom</label>
            <input name="name" value={name} onChange={handleNameChange} required className="admin-input" placeholder="ex: Tronc commun" />
          </div>
          <div>
            <label className="admin-label">Slug (URL)</label>
            <input name="slug" value={slug} onChange={handleSlugChange} required className="admin-input" placeholder="ex: tronc-commun" />
          </div>
        </div>
        
        <div className="admin-form-group">
          <label className="admin-label">Ordre d&apos;affichage</label>
          <input name="order" type="number" value={order} onChange={(e) => setOrder(parseInt(e.target.value) || 0)} required className="admin-input" />
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Créer le niveau')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={loading} className="btn btn-outline">
              Annuler
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="admin-section-title">Niveaux existants</h2>
        
        {/* Desktop table */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ordre</th>
                <th>Nom</th>
                <th>Slug</th>
                <th style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level.id}>
                  <td>{level.order}</td>
                  <td className="cell-title">{level.name}</td>
                  <td className="cell-muted">{level.slug}</td>
                  <td>
                    <div className="cell-actions">
                      <button onClick={() => startEdit(level)} className="admin-btn-edit">
                        Éditer
                      </button>
                      <button onClick={() => handleDelete(level.id)} className="admin-btn-delete">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {levels.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    Aucun niveau.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="admin-card-list">
          {levels.map((level) => (
            <div key={level.id} className="admin-card-item">
              <div className="admin-card-item-header">
                <span className="item-title">{level.name}</span>
              </div>
              <div className="admin-card-item-body">
                <div className="field">
                  <span className="field-label">Ordre</span>
                  <span className="field-value">{level.order}</span>
                </div>
                <div className="field">
                  <span className="field-label">Slug</span>
                  <span className="field-value">{level.slug}</span>
                </div>
              </div>
              <div className="admin-card-item-actions">
                <button onClick={() => startEdit(level)} className="admin-btn-edit">
                  Éditer
                </button>
                <button onClick={() => handleDelete(level.id)} className="admin-btn-delete">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {levels.length === 0 && (
            <div className="admin-card-empty">Aucun niveau.</div>
          )}
        </div>
      </div>
    </div>
  );
}
