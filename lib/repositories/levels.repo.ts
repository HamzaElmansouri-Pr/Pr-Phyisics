import { createClient } from '@/lib/supabase/server';
import { levelSchema, LevelInput } from '@/lib/validation/schemas';

export async function getLevels() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('order', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

export async function getLevelBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createLevel(input: LevelInput) {
  const parsed = levelSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('levels')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateLevel(id: string, input: Partial<LevelInput>) {
  // Partial validation could be done, or we validate the whole object by merging.
  // For simplicity, we just use Supabase for partial update but full validation is ideal if full object is passed.
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('levels')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteLevel(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('levels')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
