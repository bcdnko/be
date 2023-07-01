import {
  BibleVersionId,
  IBibleBook,
} from '../../../../../../core/interfaces/Bible.interfaces';
import { url } from '../../../../../../core/util/url';

export async function fetchBibleBooks(
  versionId: BibleVersionId
): Promise<IBibleBook[]> {
  const fetchedBooks = await fetch(
    url(['bible', 'versions', versionId, 'books.json'])
  );

  return fetchedBooks.json();
}
