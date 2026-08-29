import { createClient } from '@/lib/supabase/server';
import { controleSchema, ControleInput } from '@/lib/validation/schemas';

export async function getControlesByLevel(levelId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('controles')
    .select('*')
    .eq('level_id', levelId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createControle(input: ControleInput) {
  const parsed = controleSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('controles')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateControle(id: string, input: Partial<ControleInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('controles')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteControle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('controles')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
