'use client';

import { useState } from 'react';
import { createResumeAction, updateResumeAction, deleteResumeAction } from './actions';

export default function ResumeForm({ resumes, levels }: { resumes: any[], levels: any[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [levelId, setLevelId] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [description, setDescription] = useState('');

  const startEdit = (r: any) => {
    setEditingId(r.id);
    setTitle(r.title);
    setLevelId(r.level_id);
    setDriveLink(r.drive_link);
    setDescription(r.description || '');
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
      ? await updateResumeAction(editingId, formData)
      : await createResumeAction(formData);
    
    if (result?.error) {
      setError(result.error);
    } else {
      cancelEdit();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce résumé ?')) {
      await deleteResumeAction(id);
    }
  }

  const getLevelName = (levelId: string) => {
    const level = levels.find(l => l.id === levelId);
    return level?.name || '—';
  };

  return (
    <div className="admin-content-gap">
      <form onSubmit={handleSubmit} className="admin-form-card">
        <h2 className="admin-form-title">{editingId ? 'Éditer le résumé' : 'Ajouter un résumé'}</h2>
        {error && <div className="admin-form-error">{error}</div>}
        
        <div className="admin-form-row">
          <div>
            <label className="admin-label">Titre</label>
            <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="admin-input" placeholder="ex: Résumé Ondes" />
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
            {loading ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Créer le résumé')}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={loading} className="btn btn-outline">
              Annuler
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="admin-section-title">Résumés existants</h2>
        
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
              {resumes.map((r) => (
                <tr key={r.id}>
                  <td className="cell-title">{r.title}</td>
                  <td className="cell-muted">{r.description}</td>
                  <td>
                    <a href={r.drive_link} target="_blank" rel="noopener noreferrer" className="admin-table-link">Ouvrir</a>
                  </td>
                  <td>
                    <div className="cell-actions">
                      <button onClick={() => startEdit(r)} className="admin-btn-edit">
                        Éditer
                      </button>
                      <button onClick={() => handleDelete(r.id)} className="admin-btn-delete">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {resumes.length === 0 && (
                <tr>
                  <td colSpan={4} className="admin-table-empty">
                    Aucun résumé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-card-list">
          {resumes.map((r) => (
            <div key={r.id} className="admin-card-item">
              <div className="admin-card-item-header">
                <span className="item-title">{r.title}</span>
              </div>
              <div className="admin-card-item-body">
                {r.description && (
                  <div className="field">
                    <span className="field-label">Desc.</span>
                    <span className="field-value">{r.description}</span>
                  </div>
                )}
                <div className="field">
                  <span className="field-label">Niveau</span>
                  <span className="field-value">{getLevelName(r.level_id)}</span>
                </div>
                <div className="field">
                  <span className="field-label">Lien</span>
                  <a href={r.drive_link} target="_blank" rel="noopener noreferrer" className="admin-table-link">Ouvrir ↗</a>
                </div>
              </div>
              <div className="admin-card-item-actions">
                <button onClick={() => startEdit(r)} className="admin-btn-edit">
                  Éditer
                </button>
                <button onClick={() => handleDelete(r.id)} className="admin-btn-delete">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {resumes.length === 0 && (
            <div className="admin-card-empty">Aucun résumé.</div>
          )}
        </div>
      </div>
    </div>
  );
}
