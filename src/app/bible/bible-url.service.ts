import { Injectable } from '@angular/core';

import {
  BibleVersionId,
  BibleVersion,
  BibleBook,
  BibleState,
} from './bible.interfaces';

@Injectable()
export class BibleUrlService {
  bibleVersion(version: BibleVersion | BibleVersionId): string[] {
    const versionId = typeof(version) === 'string' ? version : version.id;

    return [
      '/bible',
      versionId,
    ];
  }

  bibleBook(
    version: BibleVersion | BibleVersionId,
    book: BibleBook | string,
  ): string[] {
    const bookId = typeof(book) === 'string'
      ? book
      : book.aliases[0].toLowerCase();

    return [
      ...this.bibleVersion(version),
      bookId,
    ];
  }

  bibleChapter(
    version: BibleVersion | BibleVersionId,
    book: BibleBook | string,
    chapter: number,
  ): string[] {
    return [
      ...this.bibleBook(version, book),
      chapter.toString(),
    ];
  }

  fromState(state: BibleState): string[] {
    if (state.version && state.book && state.chapter) {
      return this.bibleChapter(state.version, state.book, state.chapter);
    } else if (state.version && state.book) {
      return this.bibleBook(state.version, state.book);
    } else if (state.version) {
      return this.bibleVersion(state.version);
    } else {
      return ['/bible'];
    }
  }

}
