import {
  BibleBookStored,
  BibleBook,
  BibleVersionId,
} from '../bible.interfaces';

export function bibleBookMapper(versionId: BibleVersionId, book: BibleBookStored): BibleBook {
  return {
    ...book,
    aliasesIndex: book.aliases.map(alias => alias.toLowerCase()),
    route: [
      '/bible',
      versionId,
      book.aliases[0].toLowerCase(),
      1,
    ],
    chaptersArray: new Array(book.chapters)
      .fill(1)
      .map((v, i) => {
        const num = i + 1;
        return {
          number: num,
          route: [
            '/bible',
            versionId,
            book.aliases[0].toLowerCase(),
            num,
          ],
        };
      }),
  };

}
