import { NextResponse } from 'next/server';
import { createLevel, getLevels, updateLevel, deleteLevel } from '@/lib/repositories/levels.repo';
import { createExercise, getExercisesByLevel, updateExercise, deleteExercise } from '@/lib/repositories/exercises.repo';
import { createBook, getBooks, updateBook, deleteBook, addBookImage, deleteBookImage } from '@/lib/repositories/books.repo';

export async function GET() {
  const results: any[] = [];
  
  try {
    // 1. Create a Level
    const level = await createLevel({
      name: 'Test Level',
      slug: `test-level-${Date.now()}`,
      order: 1,
    });
    results.push({ step: 'createLevel', status: 'success', data: level });

    // 2. Get Levels
    const levels = await getLevels();
    results.push({ step: 'getLevels', status: 'success', count: levels.length });

    // 3. Create an Exercise
    const exercise = await createExercise({
      level_id: level.id,
      title: 'Test Exercise',
      description: 'A test exercise',
      drive_link: 'https://example.com/drive',
    });
    results.push({ step: 'createExercise', status: 'success', data: exercise });

    // 4. Get Exercises
    const exercises = await getExercisesByLevel(level.id);
    results.push({ step: 'getExercisesByLevel', status: 'success', count: exercises.length });

    // 5. Create a Book
    const book = await createBook({
      title: 'Test Book',
      slug: 'test-book',
      description: 'A test book',
      cover_image_url: 'https://example.com/cover.jpg',
      whatsapp_message: 'Hello, I want to buy this book!',
    });
    results.push({ step: 'createBook', status: 'success', data: book });

    // 6. Add Book Image
    const bookImage = await addBookImage({
      book_id: book.id,
      image_url: 'https://example.com/extra.jpg',
    });
    results.push({ step: 'addBookImage', status: 'success', data: bookImage });

    // 7. Get Books
    const books = await getBooks();
    results.push({ step: 'getBooks', status: 'success', count: books.length });

    // 8. Cleanup (Delete everything)
    await deleteBookImage(bookImage.id);
    await deleteBook(book.id);
    await deleteExercise(exercise.id);
    await deleteLevel(level.id);
    results.push({ step: 'cleanup', status: 'success' });

    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, results }, { status: 500 });
  }
}
