'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { createExercise, updateExercise, deleteExercise } from '@/lib/repositories/exercises.repo';
import { exerciseSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createExerciseAction(formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = exerciseSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await createExercise(parsed.data);
    revalidatePath('/admin/exercises');
    revalidatePath('/exercices');
    revalidatePath(`/exercices/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateExerciseAction(id: string, formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = exerciseSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await updateExercise(id, parsed.data);
    revalidatePath('/admin/exercises');
    revalidatePath('/exercices');
    revalidatePath(`/exercices/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteExerciseAction(id: string) {
  await requireAdmin();
  try {
    await deleteExercise(id);
    revalidatePath('/admin/exercises');
    revalidatePath('/exercices');
    revalidatePath(`/exercices/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
