import {
  BibleBookId,
  BibleChapterId,
  BibleVersionId,
  IBibleTextToken,
  IBibleVerse,
  IBibleVerseStored,
} from '../../../../../../core/interfaces/Bible.interfaces';
import { url } from '../../../../../../core/util/url';

function parseVerseText(verseText: string): IBibleTextToken[] {
  const markers: string[] = [];

  function parseToken(rawToken: string): IBibleTextToken | undefined {
    if (rawToken === '') {
      return undefined;
    }

    const strongNumber = rawToken.match(/^\s*([GH]*\d+)$/);
    const marker = rawToken.match(/^\[(.*?)\]$/);
    const punctuation = rawToken.match(/^[.,!?\-:;'"«»]$/);
    const space = rawToken === ' ';

    if (strongNumber) {
      return {
        type: 'strong',
        text: strongNumber[1],
        markers: [...markers],
      };
    } else if (marker) {
      if (marker[1][0] === '/') {
        const i = markers.indexOf(marker[1].substring(1));
        if (i === -1) {
          throw new Error('Something went wrong');
        }
        markers.splice(i, 1);
      } else {
        markers.push(marker[1]);
      }

      return undefined;
    } else if (punctuation) {
      return {
        type: 'punctuation',
        text: rawToken,
        markers: [...markers],
      };
    } else if (space) {
      return {
        type: 'space',
        text: ' ',
      };
    } else {
      return {
        type: 'word',
        text: rawToken,
        markers: [...markers],
      };
    }
  }

  const parsedText = verseText
    .split(/(\[.*?\]|\s*[GH]*\d+|[ .,!?\-:;'"«»])/)
    .reduce((acc, rawToken) => {
      const token = parseToken(rawToken);
      if (token) {
        acc.push(token);
      }
      return acc;
    }, [] as IBibleTextToken[]);

  return parsedText;
}

export async function fetchVerses(
  versionId: BibleVersionId,
  bookId: BibleBookId,
  chapter: BibleChapterId
): Promise<IBibleVerse[]> {
  const res = await fetch(
    url([
      'bible',
      'versions',
      versionId,
      'books',
      bookId.toString(),
      chapter.toString() + '.json',
    ])
  );

  const verses: IBibleVerseStored[] = await res.json();

  return verses.map((verse) => ({
    ...verse,
    textParsed: parseVerseText(verse.text),
  }));
}
