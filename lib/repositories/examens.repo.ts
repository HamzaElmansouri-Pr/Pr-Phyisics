import { createClient } from '@/lib/supabase/server';
import { examenSchema, ExamenInput } from '@/lib/validation/schemas';

export async function getExamensByLevel(levelId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('examens')
    .select('*')
    .eq('level_id', levelId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createExamen(input: ExamenInput) {
  const parsed = examenSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('examens')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateExamen(id: string, input: Partial<ExamenInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('examens')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteExamen(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('examens')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
