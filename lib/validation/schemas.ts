import { z } from 'zod';

export const levelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  order: z.number().int().default(0),
});

export const exerciseSchema = z.object({
  level_id: z.string().uuid('Invalid level ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  drive_link: z.string().url('Drive link must be a valid URL'),
});

export const controleSchema = z.object({
  level_id: z.string().uuid('Invalid level ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  drive_link: z.string().url('Drive link must be a valid URL'),
});

export const examenSchema = z.object({
  level_id: z.string().uuid('Invalid level ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  drive_link: z.string().url('Drive link must be a valid URL'),
});

export const resumeSchema = z.object({
  level_id: z.string().uuid('Invalid level ID'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  drive_link: z.string().url('Drive link must be a valid URL'),
});

export const bookSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  description: z.string().optional().nullable(),
  cover_image_url: z.string().url('URL image invalide'),
  whatsapp_message: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  is_available: z.boolean().default(true).optional(),
});

export const bookImageSchema = z.object({
  book_id: z.string().uuid('Invalid book ID'),
  image_url: z.string().url('Image must be a valid URL'),
});

// Type inferences for TypeScript
export type LevelInput = z.infer<typeof levelSchema>;
export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type ControleInput = z.infer<typeof controleSchema>;
export type ExamenInput = z.infer<typeof examenSchema>;
export type ResumeInput = z.infer<typeof resumeSchema>;
export type BookInput = z.infer<typeof bookSchema>;
export type BookImageInput = z.infer<typeof bookImageSchema>;
