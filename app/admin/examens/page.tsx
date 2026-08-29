import { getLevels } from '@/lib/repositories/levels.repo';
import { createClient } from '@/lib/supabase/server';
import ExamenForm from './ExamenForm';

export const metadata = {
  title: 'Admin - Examens',
};

export default async function ExamensAdminPage() {
  const levels = await getLevels();
  
  const supabase = await createClient();
  const { data: examens, error } = await supabase
    .from('examens')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Examens</h1>
      <ExamenForm examens={examens || []} levels={levels} />
    </div>
  );
}
