'use client';

import { useState, useTransition } from 'react';
import { updatePassword } from './actions';

export default function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    startTransition(async () => {
      setError(null);
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Nouveau mot de passe</h1>
        <p className="admin-login-subtitle">Veuillez entrer votre nouveau mot de passe.</p>
        
        {error && <div className="admin-login-error">{error}</div>}

        <form action={handleSubmit} className="admin-login-form">
          <div>
            <label className="admin-label">Nouveau mot de passe</label>
            <input name="password" type="password" required className="admin-input" placeholder="••••••••" />
          </div>
          <div>
            <label className="admin-label">Confirmer le mot de passe</label>
            <input name="confirmPassword" type="password" required className="admin-input" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isPending}>
            {isPending ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </form>
      </div>
    </div>
  );
}
