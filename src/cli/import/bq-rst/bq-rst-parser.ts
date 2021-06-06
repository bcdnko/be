import {
  BibleVersionStored,
  BibleBookStored,
  BibleVerseStored,
} from 'core/interfaces/Bible.interfaces';
import { BqParser } from '../bq-parser';

export default class BqRstParser extends BqParser {
  protected _chapterRegex = /^<h4>(\d+)<\/h4>$/;
  protected _verseRegex = /^(<p><sup>(\d+)<\/sup> (.+)$)/;
  protected _jesusWordsRegex = null;

  parseVersion(): BibleVersionStored {
    return Object.assign(
      {},
      super.parseVersion(),
      {
        id: 'rst',
        title: 'Синодальный перевод',
        titleShort: 'Синодальный',
        titleShortest: 'RST',
        langId: 'ru',
        strongId: 'mb-strong-ru',
      },
    );
  }

  parseBookVerses(book: BibleBookStored): BibleVerseStored[] {
    return super.parseBookVerses(book)
      .map(verse => {
        const text = verse.text
          .split(/<font.*?>/).join('[Jesus]')
          .split('</font>').join('[/Jesus]')
          .split('<i>').join('[i]')
          .split('</i>').join('[/i]');

        return {...verse, text};
      })
      .map(verse => {
        if (verse.text.includes('<')) {
          throw new Error('Verse should not contain tags');
        }
        return verse;
      });
  }
}
