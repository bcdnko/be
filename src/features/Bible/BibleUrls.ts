import {
  BibleVersionId,
  BibleVersionStored,
  BibleBookStored,
} from 'core/interfaces/Bible.interfaces';

import { BibleState } from './Bible.interfaces';

export function getBibleVersionUrl(version: BibleVersionStored | BibleVersionId): string {
  const versionId = typeof(version) === 'string' ? version : version.id;

  return ['/bible', versionId, '1', '1'].join('/');
}

export function getBibleBookUrl(
  version: BibleVersionStored | BibleVersionId,
  book: BibleBookStored | string,
): string {
  const bookId = typeof(book) === 'string'
    ? book
    : book.aliases[0].toLowerCase();

    return [
      getBibleVersionUrl(version),
      bookId,
    ].join('/');
}

export function getBibleChapterUrl(
  version: BibleVersionStored | BibleVersionId,
  book: BibleBookStored | string,
  chapter: number,
): string {
  return [
    getBibleBookUrl(version, book),
    chapter.toString(),
  ].join('/');
}

export function getUrlFromBibleState(state: BibleState): string {
  if (state.version && state.book && state.chapter) {
    return getBibleChapterUrl(state.version, state.book, state.chapter);
  } else if (state.version && state.book) {
    return getBibleBookUrl(state.version, state.book);
  } else if (state.version) {
    return getBibleVersionUrl(state.version);
  } else {
    return '/bible';
  }
}
