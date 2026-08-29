import { getLevels } from '@/lib/repositories/levels.repo';
import { createClient } from '@/lib/supabase/server';
import ResumeForm from './ResumeForm';

export const metadata = {
  title: 'Admin - Résumés',
};

export default async function ResumesAdminPage() {
  const levels = await getLevels();
  
  const supabase = await createClient();
  const { data: resumes, error } = await supabase
    .from('resumes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Résumés</h1>
      <ResumeForm resumes={resumes || []} levels={levels} />
    </div>
  );
}
