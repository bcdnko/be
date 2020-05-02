import { Injectable } from '@angular/core';

import {
  BibleVersionId,
  BibleState,
} from './bible.interfaces';

@Injectable()
export class BibleUrlService {
  bibleVersion(arg: BibleVersionId | BibleState): string[] {
    const versionId = ((arg as BibleState) && typeof(arg) === 'object') ? arg.version.id : (arg as BibleVersionId);

    return [
      '/bible',
      versionId,
    ];
  }

  bibleBook(state: BibleState): string[];
  bibleBook(versionId: BibleVersionId, bookUrlId: string): string[];
  bibleBook(...args): string[] {
    const bookId = ((args[0] as BibleState) && typeof(args[0]) === 'object')
      ? args[0].book.aliases[0].toLowerCase()
      : (args[1] as string);

    return [
      ...this.bibleVersion(args[0]),
      bookId,
    ];
  }

  bibleChapter(state: BibleState): string[];
  bibleChapter(versionId: BibleVersionId, bookUrlId: string, chapter: number): string[];
  bibleChapter(...args): string[] {
    if ((args[0] as BibleState) && typeof(args[0]) === 'object') {
      const state = args[0];
      return [
        ...this.bibleBook(state),
        state.chapter.toString()
      ];
    } else {
      return [
        ...this.bibleBook(args[0], args[1]),
        args[2].toString(),
      ];
    }
  }
}
