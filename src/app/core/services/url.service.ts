import { Injectable } from '@angular/core';

import {
  BibleVersionId,
  BibleBookId,
} from '../../bible/bible.interfaces';

@Injectable()
export class UrlService {
  bibleVersion(versionId: BibleVersionId): string[] {
    return ['bible', versionId];
  }

  bibleBook(versionId: BibleVersionId, bookId: BibleBookId): string[] {
    return ['bible', versionId, bookId.toString()];
  }
}
