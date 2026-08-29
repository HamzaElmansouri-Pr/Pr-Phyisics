import { createClient } from '@/lib/supabase/server';
import { resumeSchema, ResumeInput } from '@/lib/validation/schemas';

export async function getResumesByLevel(levelId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('level_id', levelId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function createResume(input: ResumeInput) {
  const parsed = resumeSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('resumes')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateResume(id: string, input: Partial<ResumeInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resumes')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteResume(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
