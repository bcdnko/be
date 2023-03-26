import {
  BibleVersionId,
  IBibleBook,
  IBibleVersion,
} from '../interfaces/Bible.interfaces';
import { url } from '../util/url';

export async function fetchBibleVersions(): Promise<IBibleVersion[]> {
  const fetchedVersions = await fetch('/bible/versions.json');
  return fetchedVersions.json();
}

export async function fetchBibleBooks(
  versionId: BibleVersionId
): Promise<IBibleBook[]> {
  const fetchedBooks = await fetch(
    url(['bible', 'versions', versionId, 'books.json'])
  );

  return fetchedBooks.json();
}
