import { BibleTextToken, BibleVerse } from '../../interfaces/Bible.interfaces';

function parseVerseText(verseText: string): BibleTextToken[] {
  const markers: string[] = [];

  function parseToken(rawToken: string): BibleTextToken | null {
    if (rawToken === '')  {
      return null;
    }

    const strongNumber = rawToken.match(/^\s*([GH]\d+)$/);
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

      return null;
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
    .split(/(\[.*?\]|\s*[GH]\d+|[ .,!?\-:;'"«»])/)
    .reduce((acc, rawToken) => {
      const token = parseToken(rawToken);
      if (token) {
        acc.push(token);
      }
      return acc;
    }, [] as BibleTextToken[]);

  return parsedText;
}

export function fetchVerses(
  versionId: string,
  bookId: number,
  chapter: number,
) {
  return fetch(`/bible/versions/${encodeURIComponent(versionId)}/books/${encodeURIComponent(bookId)}/${encodeURIComponent(chapter)}.json`)
    .then(res => res.json())
    .then((verses: BibleVerse[]) => {
      return verses.map(verse => ({
        ...verse,
        textParsed: parseVerseText(verse.text),
      }))
    });
}
