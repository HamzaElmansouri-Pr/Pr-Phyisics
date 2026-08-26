import { createClient } from '@/lib/supabase/server';

/**
 * requireAdmin - Defense-in-depth helper for Server Actions
 * Checks if the current request has a valid Supabase session.
 * Throws an error if unauthorized.
 * Returns the Supabase client so the action can reuse it.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized: Admin access required');
  }

  return supabase;
}
