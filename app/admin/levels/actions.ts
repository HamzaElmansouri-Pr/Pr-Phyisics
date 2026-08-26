'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { createLevel, updateLevel, deleteLevel } from '@/lib/repositories/levels.repo';
import { levelSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createLevelAction(formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const order = parseInt(formData.get('order') as string || '0', 10);

  const parsed = levelSchema.safeParse({ name, slug, order });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await createLevel(parsed.data);
    revalidatePath('/admin/levels');
    revalidatePath('/exercices');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateLevelAction(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const order = parseInt(formData.get('order') as string || '0', 10);

  const parsed = levelSchema.safeParse({ name, slug, order });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await updateLevel(id, parsed.data);
    revalidatePath('/admin/levels');
    revalidatePath('/exercices');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteLevelAction(id: string) {
  await requireAdmin();
  try {
    await deleteLevel(id);
    revalidatePath('/admin/levels');
    revalidatePath('/exercices');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
