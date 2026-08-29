'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { createExamen, updateExamen, deleteExamen } from '@/lib/repositories/examens.repo';
import { examenSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createExamenAction(formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = examenSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await createExamen(parsed.data);
    revalidatePath('/admin/examens');
    revalidatePath('/examens');
    revalidatePath(`/examens/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateExamenAction(id: string, formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = examenSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await updateExamen(id, parsed.data);
    revalidatePath('/admin/examens');
    revalidatePath('/examens');
    revalidatePath(`/examens/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteExamenAction(id: string) {
  await requireAdmin();
  try {
    await deleteExamen(id);
    revalidatePath('/admin/examens');
    revalidatePath('/examens');
    revalidatePath(`/examens/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
