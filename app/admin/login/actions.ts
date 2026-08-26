'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Check if MFA is required
  const { data: mfaData, error: mfaError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (mfaError) {
    return { error: mfaError.message };
  }

  if (mfaData.nextLevel === 'aal2' && mfaData.currentLevel === 'aal1') {
    // MFA is required
    return { mfaRequired: true };
  }

  redirect('/admin/dashboard');
}

export async function verifyTotp(formData: FormData) {
  const code = formData.get('code') as string;
  const supabase = await createClient();

  const { data: factorsData, error: factorsError } =
    await supabase.auth.mfa.listFactors();
  if (factorsError) {
    return { error: factorsError.message };
  }

  const totpFactor = factorsData.totp[0];
  if (!totpFactor) {
    return { error: 'No TOTP factor found' };
  }

  const { data: challengeData, error: challengeError } =
    await supabase.auth.mfa.challenge({ factorId: totpFactor.id });
  if (challengeError) {
    return { error: challengeError.message };
  }

  const { error } = await supabase.auth.mfa.verify({
    factorId: totpFactor.id,
    challengeId: challengeData.id,
    code,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/admin/dashboard');
}
