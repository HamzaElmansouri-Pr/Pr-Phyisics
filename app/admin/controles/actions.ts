'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { createControle, updateControle, deleteControle } from '@/lib/repositories/controles.repo';
import { controleSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createControleAction(formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = controleSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await createControle(parsed.data);
    revalidatePath('/admin/controles');
    revalidatePath('/controles');
    revalidatePath(`/controles/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateControleAction(id: string, formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = controleSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await updateControle(id, parsed.data);
    revalidatePath('/admin/controles');
    revalidatePath('/controles');
    revalidatePath(`/controles/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteControleAction(id: string) {
  await requireAdmin();
  try {
    await deleteControle(id);
    revalidatePath('/admin/controles');
    revalidatePath('/controles');
    revalidatePath(`/controles/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
