'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { createResume, updateResume, deleteResume } from '@/lib/repositories/resumes.repo';
import { resumeSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createResumeAction(formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = resumeSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await createResume(parsed.data);
    revalidatePath('/admin/resumes');
    revalidatePath('/resumes');
    revalidatePath(`/resumes/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateResumeAction(id: string, formData: FormData) {
  await requireAdmin();

  const level_id = formData.get('level_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const drive_link = formData.get('drive_link') as string;

  const parsed = resumeSchema.safeParse({ level_id, title, description, drive_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  try {
    await updateResume(id, parsed.data);
    revalidatePath('/admin/resumes');
    revalidatePath('/resumes');
    revalidatePath(`/resumes/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteResumeAction(id: string) {
  await requireAdmin();
  try {
    await deleteResume(id);
    revalidatePath('/admin/resumes');
    revalidatePath('/resumes');
    revalidatePath(`/resumes/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
