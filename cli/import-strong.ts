import { parseArguments } from './parse-arguments';
import {
  StrongWord,
  StrongDictionary,
} from '../src/core/interfaces/Bible.interfaces';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const appRoot = require('app-root-path').toString();
const importPath = path.join(appRoot, 'imports', 'strong');
const targetPath = path.join(appRoot, 'public', 'dicts');

function saveDict(id, dict: StrongDictionary): void {
  const filePath = path.join(targetPath, id + '.json');
  mkdirp.sync(targetPath);
  fs.writeFileSync(filePath, JSON.stringify(dict));
}

(async () => {
  try {
    const args = parseArguments();
    if (!args['id'] || typeof args['id'] !== 'string' || !args['id'].length) {
      throw new Error('Stong ID was not provided. Please specify it by using -id ID');
    }

    const importId = args['id'];
    const parserDir = path
      .join(appRoot, 'cli', 'import-strong', importId);
    const parserPath = path.join(parserDir, importId + '-parser');

    const Parser = await import(parserPath);
    const dataPath = path.join(importPath, importId);

    console.log('Importing from: ' + dataPath);
    const parser = new Parser.default(dataPath, parserDir);

    let word;
    let dict: StrongDictionary = {};

    while (word = await parser.parseStrong()) {
      dict[word.id] = word;
    }

    saveDict(importId, dict);

    console.log('done\n');
  } catch (e) {
    throw e;
    console.log(`Error: ${e.message}`);
  }
})();
