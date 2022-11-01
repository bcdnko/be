import { BibleBookStored, BibleVersionStored } from '../interfaces/Bible.interfaces';
import { url } from '../util/url';

export function fetchBibleVersions(): Promise<BibleVersionStored[]> {
  return fetch('/bible/versions.json')
    .then(res => res.json());
}

export function fetchBibleBooks(versionId: string): Promise<BibleBookStored[]> {
  return fetch(url(['bible', 'versions', versionId, 'books.json']))
    .then(res => res.json());
}

