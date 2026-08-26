import { getLevels } from '@/lib/repositories/levels.repo';
import { createClient } from '@/lib/supabase/server';
import ExerciseForm from './ExerciseForm';

export const metadata = {
  title: 'Admin - Exercices',
};

export default async function ExercisesAdminPage() {
  const levels = await getLevels();
  
  // We need all exercises for the admin list. The repo function `getExercisesByLevel` is specific.
  // We'll just fetch all exercises here directly or we could add `getExercises()` to repo.
  // Using direct fetch since admin needs it, or better yet, we can add a simple query here.
  const supabase = await createClient();
  const { data: exercises, error } = await supabase
    .from('exercises')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Exercices</h1>
      <ExerciseForm exercises={exercises || []} levels={levels} />
    </div>
  );
}
