import { BibleParser } from './parser';
import {
  BibleVersionStored,
  BibleBookStored,
  BibleVerseStored,
  BibleBookId,
} from 'core/interfaces/Bible.interfaces';
import { parseBqIni } from './parse-bq-ini';

const fs = require('fs');
const path = require('path');
const util = require('util');

export class BqParser extends BibleParser {
  protected _module: any;
  protected _currentChapter: number;
  protected _currentVerseNo: number;
  protected _chapterRegex = null;
  protected _verseRegex = null;
  protected _verseNewLineRegex = /^(?!.*<.*?>).*$/;
  protected _jesusWordsRegex = null;

  parseVersion(): BibleVersionStored {
    return {
      id: this.module['BibleShortName'],
      title: this.module['ModuleName'],
      titleShort: this.module['BibleShortName'],
      titleShortest: null,
      langId: null,
      copyright: this.module['Copyright'],
      updated: this.module['ModuleVersion'],
    };
  }

  parseBooks(): BibleBookStored[] {
    const version = this.parseVersion();
    const books = this.module['PathName']
      .map((_, i) => {
        const idMatch = _.match(/^\d+/);

        if (!idMatch) {
          throw new Error('Book didn\'t match');
        }

        const id = parseInt(idMatch[0], 10);
        const defaults = this._defaults && this._defaults.books.find(_ => _.id === id) || {};

        return {
          id: id,
          cvId: null,
          versionId: version.id,
          title: this.module['FullName'][i],
          titleShort: this.module['FullName'][i],
          chapters: parseInt(this.module['ChapterQty'][i], 10),
          testament: id < 40 ? 'old' : 'new',
          ...defaults,
          aliases: this._parseAliases(this.module['ShortName'][i], defaults.aliases || []),
        };
      })
      .sort((a, b) => a.id - b.id);

    return books;
  }

  protected get module(): any {
    if (!this._module) {
      this._module = parseBqIni(path.join(this._path, 'bibleqt.ini'));
    }
    return this._module;
  }

  private _parseAliases(aliases: string, defaults: string[]): string[] {
    const result = [...defaults];

    for (let alias of aliases.split(' ')) {
      if (!result.includes(alias))
      result.push(alias);
    }

    return result;
  }

  parseBookVerses(book: BibleBookStored): BibleVerseStored[] {
    const file = this.module['PathName'].sort()[book.id - 1];
    const rawVerses = fs.readFileSync(path.join(this._path, file));
    this._currentChapter = null;
    this._currentVerseNo = null;

    const verses = rawVerses.toString()
      .split('<p>').join('\n<p>')
      .split('\n')
      .map(row => row.trim())
      .reduce(
        (acc: BibleVerseStored[], row: string) => this._parseRow(book, row, acc),
        [],
      )
      .filter(_ => !!_);

    return verses;
  }

  private _parseRow(
    book: BibleBookStored,
    row: string,
    acc: BibleVerseStored[],
  ): BibleVerseStored[] {
    const chapterMatch = row.match(this._chapterRegex);
    const verseMatch = row.match(this._verseRegex);
    const verseNewLineMatch = row.match(this._verseNewLineRegex);

    if (!row || !row.length) {
      return acc;
    }

    if (chapterMatch) {
      this._currentChapter = parseInt(chapterMatch[1], 10);

      if (!this._currentChapter) {
        throw new Error('Malformed chapter: ' + JSON.stringify(row));
      }

      this._currentVerseNo = null;
    } else if (verseMatch) {
      const verseNo = parseInt(verseMatch[2], 10);
      this._currentVerseNo = verseNo;

      if (!verseNo) {
        throw new Error('Malformed verse number: ' + JSON.stringify(row));
      }

      if (!verseMatch[3].length) {
        throw new Error('Malformed verse text: ' + JSON.stringify(row));
      }

      acc.push({
        id: null,
        cvId: null,
        bookId: book.id,
        chapter: this._currentChapter,
        no: verseNo,
        text: verseMatch[3],
      });
    } else if (verseNewLineMatch && this._currentVerseNo) {
      const verse = acc.find(v => {
        return v.bookId === book.id
          && v.chapter === this._currentChapter
          && v.no === this._currentVerseNo;
      });

      if (!verse) {
        throw new Error('No current verse');
      }

      verse.text += ' ' + row;
    } else {
      console.log(
        'Malformed row: ' +
        ' Book: ' + book.id +
        ' Chapter: ' + this._currentChapter +
        ' Text: ' + JSON.stringify(row)
      );
      acc[acc.length - 1].text += ' ' + row;
      throw new Error('Malformed rows');
    }

    return acc;
  }
}
