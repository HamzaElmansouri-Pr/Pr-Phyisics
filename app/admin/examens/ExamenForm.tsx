'use client';

import { useState } from 'react';
import { createExamenAction, updateExamenAction, deleteExamenAction } from './actions';

export default function ExamenForm({ examens, levels }: { examens: any[], levels: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [levelId, setLevelId] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [description, setDescription] = useState('');

  const startEdit = (e: any) => {
    setEditingId(e.id);
    setTitle(e.title);
    setLevelId(e.level_id);
    setDriveLink(e.drive_link);
    setDescription(e.description || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setLevelId('');
    setDriveLink('');
    setDescription('');
    setError('');
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const result = editingId 
      ? await updateExamenAction(editingId, formData)
      : await createExamenAction(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      cancelEdit();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet examen ?')) {
      await deleteExamenAction(id);
    }
  }

  const getLevelName = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    return level?.name || '—';
  };

  return (
    <div className="admin-content-gap">
      <form onSubmit={handleSubmit} className="admin-form-card">
        <h2 className="admin-form-title">{editingId ? 'Éditer l\'examen' : 'Ajouter un examen'}</h2>
        {error && <div className="admin-form-error">{error}</div>}
        
        <div className="admin-form-row">
          <div>
            <label className="admin-label">Titre</label>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="admin-input" placeholder="ex: Examen National 2023" />
          </div>
          <div>
            <label className="admin-label">Niveau</label>
            <select name="level_id" value={levelId} onChange={(e) => setLevelId(e.target.value)} required className="admin-input">
              <option value="">Sélectionner un niveau</option>
              {levels.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="admin-form-group">
          <label className="admin-label">Lien Google Drive</label>
          <input name="drive_link" type="url" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} required className="admin-input" placeholder="https://drive.google.com/..." />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description (Optionnel)</label>
          <input name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="admin-input" />
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Créer l\'examen')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={loading} className="btn btn-outline">
              Annuler
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="admin-section-title">Examens existants</h2>
        
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Lien</th>
                <th style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {examens.map((e) => (
                <tr key={e.id}>
                  <td className="cell-title">{e.title}</td>
                  <td className="cell-muted">{e.description}</td>
                  <td>
                    <a href={e.drive_link} target="_blank" rel="noopener noreferrer" className="admin-table-link">Ouvrir</a>
                  </td>
                  <td>
                    <div className="cell-actions">
                      <button onClick={() => startEdit(e)} className="admin-btn-edit">
                        Éditer
                      </button>
                      <button onClick={() => handleDelete(e.id)} className="admin-btn-delete">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {examens.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    Aucun examen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-card-list">
          {examens.map((e) => (
            <div key={e.id} className="admin-card-item">
              <div className="admin-card-item-header">
                <span className="item-title">{e.title}</span>
              </div>
              <div className="admin-card-item-body">
                {e.description && (
                  <div className="field">
                    <span className="field-label">Desc.</span>
                    <span className="field-value">{e.description}</span>
                  </div>
                )}
                <div className="field">
                  <span className="field-label">Niveau</span>
                  <span className="field-value">{getLevelName(e.level_id)}</span>
                </div>
                <div className="field">
                  <span className="field-label">Lien</span>
                  <a href={e.drive_link} target="_blank" rel="noopener noreferrer" className="admin-table-link">Ouvrir ↗</a>
                </div>
              </div>
              <div className="admin-card-item-actions">
                <button onClick={() => startEdit(e)} className="admin-btn-edit">
                  Éditer
                </button>
                <button onClick={() => handleDelete(e.id)} className="admin-btn-delete">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {examens.length === 0 && (
            <div className="admin-card-empty">Aucun examen.</div>
          )}
        </div>
      </div>
    </div>
  );
}
