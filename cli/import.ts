import { parseArguments } from './parse-arguments';
import {
  BibleVersion,
  BibleBook,
  BibleVerseStored,
} from '../src/app/bible/bible.interfaces';

const fs = require('fs');
const fsExtra = require('fs-extra');
const ProgressBar = require('progress');
const mkdirp = require('mkdirp');

const appRoot = require('app-root-path').toString();
const path = require('path');

const importPath = path.join(appRoot, 'imports', 'bible');
const targetPath = path.join(appRoot, 'src', 'assets', 'bible', 'versions');

function saveVersion(version: BibleVersion): void {
  const versionPath = path.join(targetPath, version.id);
  const versionFilePath = versionPath + '.json';

  // Clean
  fsExtra.removeSync(versionPath);
  fsExtra.removeSync(versionFilePath);

  mkdirp.sync(versionPath);
  fs.writeFileSync(
    versionFilePath,
    JSON.stringify(version),
  );
}

function saveBooks(version: BibleVersion, books: BibleBook[]): void {
  const versionPath = path.join(targetPath, version.id);
  fs.writeFileSync(
    path.join(versionPath, 'books.json'),
    JSON.stringify(books),
  );
}

function saveChapter(
  book: BibleBook,
  chapter: number,
  verses: BibleVerseStored[],
): void {
  const bookPath = path.join(targetPath, book.versionId, 'books', book.id.toString());
  mkdirp.sync(bookPath);
  fs.writeFileSync(
    path.join(bookPath, chapter + '.json'),
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
  const parserDir = path
    .join(appRoot, 'cli', 'import', importId);
  const parserPath = path.join(parserDir, importId + '-parser');

  import(parserPath)
    .then(Parser => {
      const dataPath = path.join(importPath, importId);

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
          const data = verses.filter((_: BibleVerseStored) => _.chapter === chapter);
          saveChapter(book, chapter, data);
        }
        bar.tick();
      }

      console.log('done\n');
    });
} catch (e) {
  throw e;
  console.log(`Error: ${e.message}`);
}
