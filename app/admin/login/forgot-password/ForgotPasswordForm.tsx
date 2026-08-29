'use client';

import { useState, useTransition } from 'react';
import { requestPasswordReset } from './actions';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await requestPasswordReset(formData);
      // We always show success to prevent email enumeration
      setSuccess(true);
    });
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Mot de passe oublié</h1>
        <p className="admin-login-subtitle">Entrez votre email administrateur pour recevoir un lien de réinitialisation.</p>
        
        {success ? (
          <div style={{ background: 'var(--surface-2)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center', margin: '20px 0' }}>
            <p style={{ color: 'var(--text)', marginBottom: '0' }}>
              Si cet email correspond à un compte administrateur, un lien de réinitialisation a été envoyé.
            </p>
            <p style={{ marginTop: '16px' }}>
              <Link href="/admin/login" className="btn btn-outline">Retour à la connexion</Link>
            </p>
          </div>
        ) : (
          <form action={handleSubmit} className="admin-login-form">
            <div>
              <label className="admin-label">Email</label>
              <input name="email" type="email" required className="admin-input" placeholder="votre@email.com" />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isPending ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link href="/admin/login" style={{ fontSize: '14px', color: 'var(--text-3)', textDecoration: 'none' }}>
                &larr; Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
