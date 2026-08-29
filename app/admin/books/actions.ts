'use server';

import { requireAdmin } from '@/lib/utils/auth';
import { validateImageFile } from '@/lib/utils/file';
import { createBook, updateBook, deleteBook } from '@/lib/repositories/books.repo';
import { bookSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';

export async function createBookAction(formData: FormData) {
  const supabase = await requireAdmin();

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const whatsapp_message = formData.get('whatsapp_message') as string;
  const priceStr = formData.get('price') as string;
  const price = priceStr ? parseFloat(priceStr) : null;
  const is_available = formData.get('is_available') === 'on';
  const extract_title = formData.get('extract_title') as string || "Voir l'extrait";
  const extract_link = formData.get('extract_link') as string;
  const file = formData.get('cover_image') as File | null;

  if (!file || file.size === 0) {
    return { error: 'Veuillez sélectionner une image de couverture.' };
  }

  // 1. Validate file (MIME type magic numbers and size) — returns detected MIME type
  const detectedMime = await validateImageFile(file, 2); // 2MB max
  if (!detectedMime) {
    return { error: 'Fichier invalide. Seules les images (JPEG, PNG, GIF, WEBP) de moins de 2 Mo sont autorisées.' };
  }

  // 2. Upload file to Supabase Storage (use server-detected MIME, not client-provided file.type)
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  
  // Convert File to Buffer/ArrayBuffer for Supabase upload
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, buffer, {
      contentType: detectedMime,
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { error: `Erreur d'upload: ${uploadError.message}` };
  }

  // 3. Get public URL
  const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
  const cover_image_url = publicUrlData.publicUrl;

  // 4. Validate text fields via Zod
  const parsed = bookSchema.safeParse({ title, slug, description, whatsapp_message, cover_image_url, price, is_available, extract_title, extract_link });
  if (!parsed.success) {
    return { error: (parsed.error as any).errors[0].message };
  }

  // 5. Save to database
  try {
    await createBook(parsed.data);
    revalidatePath('/admin/books');
    revalidatePath('/livres');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateBookAction(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const whatsapp_message = formData.get('whatsapp_message') as string;
  const priceStr = formData.get('price') as string;
  const price = priceStr ? parseFloat(priceStr) : null;
  const is_available = formData.get('is_available') === 'on';
  const extract_title = formData.get('extract_title') as string || "Voir l'extrait";
  const extract_link = formData.get('extract_link') as string;
  const file = formData.get('cover_image') as File | null;
  const existing_cover_url = formData.get('existing_cover_url') as string;

  let cover_image_url = existing_cover_url;

  if (file && file.size > 0) {
    const detectedMime = await validateImageFile(file, 2);
    if (!detectedMime) return { error: 'Fichier invalide. JPEG/PNG/GIF/WEBP < 2Mo' };

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, buffer, { contentType: detectedMime });

    if (uploadError) return { error: `Erreur d'upload: ${uploadError.message}` };

    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    cover_image_url = publicUrlData.publicUrl;
  }

  const parsed = bookSchema.safeParse({ title, slug, description, whatsapp_message, cover_image_url, price, is_available, extract_title, extract_link });
  if (!parsed.success) return { error: (parsed.error as any).errors[0].message };

  try {
    await updateBook(id, parsed.data);
    revalidatePath('/admin/books');
    revalidatePath('/livres');
    revalidatePath(`/livres/[slug]`, 'page');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteBookAction(id: string) {
  await requireAdmin();
  try {
    // Note: We might want to delete the image from storage too, but keeping it simple for now.
    await deleteBook(id);
    revalidatePath('/admin/books');
    revalidatePath('/livres');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
