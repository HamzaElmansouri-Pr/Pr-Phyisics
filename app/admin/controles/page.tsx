import { getLevels } from '@/lib/repositories/levels.repo';
import { createClient } from '@/lib/supabase/server';
import ControleForm from './ControleForm';

export const metadata = {
  title: 'Admin - Contrôles',
};

export default async function ControlesAdminPage() {
  const levels = await getLevels();
  
  const supabase = await createClient();
  const { data: controles, error } = await supabase
    .from('controles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Contrôles</h1>
      <ControleForm controles={controles || []} levels={levels} />
    </div>
  );
}
