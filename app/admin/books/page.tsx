import { getBooks } from '@/lib/repositories/books.repo';
import BookForm from './BookForm';

export const metadata = {
  title: 'Admin - Livres',
};

export default async function BooksAdminPage() {
  const books = await getBooks();

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Gestion des Livres</h1>
      <BookForm books={books} />
    </div>
  );
}
