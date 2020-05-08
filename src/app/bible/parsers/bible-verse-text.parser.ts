import { Injectable } from '@angular/core';

import {
  BibleVerse,
  BibleVerseStored,
  BibleTextToken,
} from '../bible.interfaces';

@Injectable()
export class BibleVerseTextParser {
  markers: string[] = [];

  parse(verses: BibleVerseStored[]): BibleVerse[] {
    this.markers = [];

    return verses.map(verse => {
      const parsedText = verse.text
        .split(/(\[.*?\]|[ .,!?\-:;'"«»])/)
        .reduce((acc, rawToken) => {
          const token = this.parseToken(rawToken);
          if (token) {
            acc.push(token);
          }
          return acc;
        }, []);

      return {
        ...verse,
        parsedText,
      };
    });
  }

  parseToken(rawToken: string): BibleTextToken {
    if (rawToken === '')  {
      return null;
    }

    const strongNumber = rawToken.match(/^[GH]\d+$/);
    const marker = rawToken.match(/^\[(.*?)\]$/);
    const punctuation = rawToken.match(/^[.,!?\-:;'"«»]$/);
    const space = rawToken === ' ';

    if (strongNumber) {
      return {
        type: 'strong',
        text: rawToken,
      };
    } else if (marker) {
      if (marker[1][0] === '/') {
        const i = this.markers.indexOf(marker[1].substring(1));
        if (i === -1) {
          throw new Error('Something went wrong');
        }
        this.markers.splice(i, 1);
      } else {
        this.markers.push(marker[1]);
      }

      return null;
    } else if (punctuation) {
      return {
        type: 'punctuation',
        text: rawToken,
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
        markers: [...this.markers],
      };
    }
  }
}
