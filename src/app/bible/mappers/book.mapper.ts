import {
  BibleBookStored,
  BibleBook,
  BibleVersionId,
} from '../bible.interfaces';
import { BibleUrlService } from '../bible-url.service';

export function bibleBookMapper(
  bibleUrlService: BibleUrlService,
  versionId: BibleVersionId,
  book: BibleBookStored
): BibleBook {
  return {
    ...book,
    aliasesIndex: book.aliases.map(alias => alias.toLowerCase()),
    route: bibleUrlService.bibleChapter(
      versionId,
      book.aliases[0].toLowerCase(),
      1,
    ),
    chaptersArray: new Array(book.chapters)
      .fill(1)
      .map((v, i) => {
        const num = i + 1;
        return {
          no: num,
          route: bibleUrlService.bibleChapter(
            versionId,
            book.aliases[0].toLowerCase(),
            num,
          ),
        };
      }),
  };

}
