import {
  IBibleVersionStored,
  IBibleBookStored,
  IBibleVerseStored,
} from 'core/interfaces/Bible.interfaces';

const fs = require('fs');
const path = require('path');

export interface IBibleParser {
  parseVersion(): IBibleVersionStored;
  parseBooks(): IBibleBookStored[];
  parseBookVerses(book: IBibleBookStored): IBibleVerseStored[];
}

export abstract class BibleParser implements IBibleParser {
  protected _path: string;
  protected _defaults = {
    books: [],
  };

  constructor(dataPath, parserPath) {
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Path doesn't exit: ${dataPath}`);
    }

    this._path = dataPath;

    const defaultsPath = path.join(parserPath, 'defaults.json');
    if (fs.existsSync(defaultsPath)) {
      this._defaults = JSON.parse(fs.readFileSync(defaultsPath));
    }
  }

  abstract parseVersion(): IBibleVersionStored;
  abstract parseBooks(): IBibleBookStored[];
  abstract parseBookVerses(book: IBibleBookStored): IBibleVerseStored[];
}
