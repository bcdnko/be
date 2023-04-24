import { RawData } from '@orama/orama';
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

export async function fetchBibleSearchDb(
  versionId: BibleVersionId
): Promise<RawData> {
  const db = await fetch(
    url(['bible', 'versions', versionId, 'search-db.json'])
  );

  return db.json();
}
