import { getLevels } from '@/lib/repositories/levels.repo';
import { getBooks } from '@/lib/repositories/books.repo';
// We don't have a getExercises() that gets ALL exercises, but we can just show levels and books counts.
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const levels = await getLevels();
  const books = await getBooks();

  const supabase = await createClient();
  const { data: exercises } = await supabase.from('exercises').select('id');

  return (
    <div>
      <h1 className="admin-page-title">Table de bord</h1>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Niveaux</div>
          <div className="admin-stat-value">{levels.length}</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Exercices</div>
          <div className="admin-stat-value">{exercises?.length || 0}</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Livres</div>
          <div className="admin-stat-value">{books.length}</div>
        </div>
      </div>
    </div>
  );
}
