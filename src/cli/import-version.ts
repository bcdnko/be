import { parseArguments } from './helper/parse-arguments';
import {
  IBibleVersionStored,
  IBibleBookStored,
  IBibleVerseStored,
} from 'core/interfaces/Bible.interfaces';

const fs = require('fs');
const fsExtra = require('fs-extra');
const ProgressBar = require('progress');
const mkdirp = require('mkdirp');
const path = require('path');

const paths = require('./helper/dirs');

function saveVersion(version: IBibleVersionStored): void {
  const versionPath = path.join(paths.bibleVersions, version.id);
  const versionFilePath = versionPath + '.json';

  // Clean
  console.log('Removing: ' + versionPath);
  fsExtra.removeSync(versionPath);

  //console.log('Removing: ' + versionFilePath);
  //fsExtra.removeSync(versionFilePath);

  console.log('Creating dir: ' + versionPath);
  mkdirp.sync(versionPath);

  console.log('Saving: ' + versionFilePath);
  fs.writeFileSync(
    versionFilePath,
    JSON.stringify(version),
  );
}

function saveBooks(version: IBibleVersionStored, books: IBibleBookStored[]): void {
  const versionPath = path.join(paths.bibleVersions, version.id);
  const versionBooksPath = path.join(versionPath, 'books.json');

  fs.writeFileSync(
    versionBooksPath,
    JSON.stringify(books),
  );
}

function saveChapter(
  book: IBibleBookStored,
  chapter: number,
  verses: IBibleVerseStored[],
): void {
  const bookPath = path.join(paths.bibleVersions, book.versionId, 'books', book.id.toString());
  mkdirp.sync(bookPath);

  const chapterPath = path.join(bookPath, chapter + '.json');
  fs.writeFileSync(
    chapterPath,
    JSON.stringify(verses),
  );
}

console.log('\n===[ Bible translation import ]===\n');

try {
  const args = parseArguments();
  if (!args['t'] || typeof args['t'] !== 'string' || !args['t'].length) {
    throw new Error('Translation ID was not provided. Please specify it by using -t ID');
  }

  const importId = args['t'];
  const parserDir = path.join(paths.importScripts, importId);
  const parserPath = path.join(parserDir, importId + '-parser');

  import(parserPath)
    .then(Parser => {
      const dataPath = path.join(paths.bibleImportsSource, importId);

      console.log('Importing from: ' + dataPath);
      const parser = new Parser.default(dataPath, parserDir);

      const version = parser.parseVersion();
      const books = parser.parseBooks();
      const bar = new ProgressBar('[:bar]', { total: books.length + 1 });

      saveVersion(version);
      saveBooks(version, books);
      bar.tick();

      for (const book of books) {
        const verses = parser.parseBookVerses(book);
        for (let chapter = 1; chapter <= book.chapters; chapter++) {
          const data = verses.filter((_: IBibleVerseStored) => _.chapter === chapter);
          saveChapter(book, chapter, data);
        }
        bar.tick();
      }

      console.log('done\n');
    });
} catch (e) {
  console.log(`Error: ${e.message}`);
    console.log('Usage example: npm run import-version -- -t bq-kjv');
}
