import { createClient } from '@/lib/supabase/server';
import { bookSchema, BookInput, bookImageSchema, BookImageInput } from '@/lib/validation/schemas';
import { z } from 'zod';

export async function getBooks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*, book_images(*)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getBookById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*, book_images(*)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch book: ${error.message}`);
  }

  return data;
}

export async function getBookBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .select('*, book_images(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    throw new Error(`Failed to fetch book by slug: ${error.message}`);
  }

  return data;
}

export async function createBook(book: z.infer<typeof bookSchema>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .insert([book])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateBook(id: string, input: Partial<BookInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('books')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBook(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function addBookImage(input: BookImageInput) {
  const parsed = bookImageSchema.parse(input);
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('book_images')
    .insert(parsed)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteBookImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('book_images')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
