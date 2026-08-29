'use client';

import { useState } from 'react';
import { login, verifyTotp } from './actions';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [mfaRequired, setMfaRequired] = useState(false);

  async function handleLogin(formData: FormData) {
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    } else if (result?.mfaRequired) {
      setMfaRequired(true);
    }
  }

  async function handleVerify(formData: FormData) {
    setError(null);
    const result = await verifyTotp(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p className="admin-login-subtitle">Connectez-vous pour accéder au panel</p>
        {error && <div className="admin-login-error">{error}</div>}

        {!mfaRequired ? (
          <form action={handleLogin} className="admin-login-form">
            <div>
              <label className="admin-label">Email</label>
              <input name="email" type="email" required className="admin-input" placeholder="votre@email.com" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label className="admin-label">Mot de passe</label>
                {/* 
                <a href="/admin/login/forgot-password" style={{ fontSize: '12px', color: 'var(--blue)', textDecoration: 'none' }}>
                  Mot de passe oublié ?
                </a>
                */}
              </div>
              <input name="password" type="password" required className="admin-input" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </form>
        ) : (
          <form action={handleVerify} className="admin-login-form">
            <div>
              <label className="admin-label">Code Authenticator (TOTP)</label>
              <input name="code" type="text" required className="admin-input" placeholder="123456" />
            </div>
            <button type="submit" className="btn btn-primary">Vérifier le code</button>
          </form>
        )}
      </div>
    </div>
  );
}
