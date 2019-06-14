import {
  BibleVersion,
  BibleBook,
} from '../../src/app/bible/bible.interfaces';
const fs = require('fs');

export abstract class BibleParser {
  protected _path: string;

  constructor(path) {
    if (!fs.existsSync(path)) {
      throw new Error('Path doesn\'t exit: ' + path);
    }

    this._path = path;
  }

  abstract parseVersion(): BibleVersion;
  abstract parseBooks();
  abstract parseBookVerses(book: BibleBook);
}
