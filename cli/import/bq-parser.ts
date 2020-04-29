import { BibleParser } from './parser';
import {
  BibleVersion,
  BibleBookStored,
  BibleVerse,
  BibleBookId,
} from '../../src/app/bible/bible.interfaces';
import { parseBqIni } from '../parse-bq-ini';

const fs = require('fs');
const path = require('path');
const util = require('util');

export class BqParser extends BibleParser {
  private _module: any;
  private _currentChapter: number;
  protected _chapterRegex = /^<h4>(\d+)<\/h4>$/;
  protected _verseRegex = /^(<p><sup>(\d+)<\/sup> (.+)$)/;

  parseVersion(): BibleVersion {
    return {
      id: this.module['BibleShortName'],
      title: this.module['ModuleName'],
      titleShort: this.module['BibleShortName'],
      langId: null,
      copyright: this.module['Copyright'],
      updated: this.module['ModuleVersion'],
    };
  }

  parseBooks(): BibleBookStored {
    const version = this.parseVersion();
    const books = this.module['PathName'].map((_, i) => {
      const id = i + 1;
      const defaults = this._defaults && this._defaults.books.find(_ => _.id === id) || {};

      return {
        ...defaults,
        id: id,
        cvId: new String(id),
        versionId: version.id,
        title: this.module['FullName'][i],
        titleShort: this.module['FullName'][i],
        chapters: parseInt(this.module['ChapterQty'][i], 10),
        aliases: this._parseAliases(this.module['ShortName'][i], defaults.aliases || []),
        testament: id < 40 ? 'old' : 'new',
      };
    });

    return books;
  }

  parseBookVerses(book: BibleBookStored): BibleVerse[] {
    const file = this.module['PathName'][book.id - 1];
    const rawVerses = fs.readFileSync(path.join(this._path, file));
    this._currentChapter = null;
    const verses = rawVerses
      .toString()
      .split('\n')
      .map(row => row.trim())
      .reduce(
        (acc: BibleVerse[], row: string) => this._parseVerse(book, row, acc),
        [],
      )
      .filter(_ => !!_);

    return verses;
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

  private _parseVerse(
    book: BibleBookStored,
    row: string,
    acc: BibleVerse[],
  ): BibleVerse[] {
    const chapterMatch = row.match(this._chapterRegex);
    const verseMatch = row.match(this._verseRegex);

    if (!row || !row.length) {
      return acc;
    }

    if (chapterMatch) {
      this._currentChapter = parseInt(chapterMatch[1]);
      if (!this._currentChapter) {
        throw new Error('Malformed chapter: ' + JSON.stringify(row));
      }
    } else if (verseMatch) {
      const verseNo = parseInt(verseMatch[2]);
      if (!verseNo) {
        throw new Error('Malformed verse number: ' + JSON.stringify(row));
      }
      if (!verseMatch[3].length) {
        throw new Error('Malformed verse text: ' + JSON.stringify(row));
      }

      acc.push({
        id: null,
        cvId: '' + verseNo,
        bookId: book.id,
        chapter: this._currentChapter,
        no: verseNo,
        text: verseMatch[3],
      });
    } else {
      console.log(
        'Malformed row: ' +
        ' Book: ' + book.id +
        ' Chapter: ' + this._currentChapter +
        ' Text: ' + JSON.stringify(row)
      );
      acc[acc.length - 1].text += ' ' + row;
    }

    return acc;
  }
}
