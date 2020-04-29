import {
  BibleVersion,
  BibleBook,
} from '../../src/app/bible/bible.interfaces';

const fs = require('fs');
const path = require('path');

export abstract class BibleParser {
  protected _path: string;
  protected _defaults = {
    books: [],
  };

  constructor(dataPath) {
    if (!fs.existsSync(dataPath)) {
      throw new Error('Path doesn\'t exit: ' + dataPath);
    }

    this._path = dataPath;

    const defaultsPath = path.join(this._path, 'defaults.json');
    if (fs.existsSync(defaultsPath)) {
      this._defaults = JSON.parse(fs.readFileSync(defaultsPath));
    }
  }

  abstract parseVersion(): BibleVersion;
  abstract parseBooks();
  abstract parseBookVerses(book: BibleBook);
}
