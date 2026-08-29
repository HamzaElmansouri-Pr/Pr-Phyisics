import UpdatePasswordForm from './UpdatePasswordForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // If not authenticated (no valid session from the email link), redirect to login
    redirect('/admin/login');
  }

  return <UpdatePasswordForm />;
}
