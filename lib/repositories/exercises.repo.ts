import { createClient } from '@/lib/supabase/server';
import { exerciseSchema, ExerciseInput } from '@/lib/validation/schemas';

export async function getExercisesByLevel(levelId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('level_id', levelId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createExercise(input: ExerciseInput) {
  const parsed = exerciseSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('exercises')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateExercise(id: string, input: Partial<ExerciseInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('exercises')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteExercise(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
