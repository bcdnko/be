import { parseArguments } from './helper/parse-arguments';
import {
  StrongWord,
  StrongDictionary,
} from 'core/interfaces/Bible.interfaces';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const paths = require('./helper/dirs');

function saveDict(id, dict: StrongDictionary): void {
  const filePath = path.join(paths.strongDicts, id + '.json');
  mkdirp.sync(paths.strongDicts);
  fs.writeFileSync(filePath, JSON.stringify(dict));
}

function saveWordDict(strongId, wordId, dict: StrongDictionary): void {
  const filePath = path.join(paths.strongDicts, strongId, wordId + '.json');
  mkdirp.sync(path.join(paths.strongDicts, strongId));
  fs.writeFileSync(filePath, JSON.stringify(dict));
}

(async () => {
  try {
    const args = parseArguments();
    if (!args['id'] || typeof args['id'] !== 'string' || !args['id'].length) {
      throw new Error('Strong ID was not provided. Please specify it by using -id ID');
    }

    const strongId = args['id'];
    const parserDir = path.join(paths.cliScripts, 'import-strong', strongId);
    const parserPath = path.join(parserDir, strongId + '-parser');

    const Parser = await import(parserPath);
    const dataPath = path.join(paths.strongImportsSource, strongId);

    console.log('Importing from: ' + dataPath);
    const parser = new Parser.default(dataPath, parserDir);

    let word;
    let dict: StrongDictionary = {};

    while (word = await parser.parseStrong()) {
      dict[word.id] = word;
      saveWordDict(strongId, word.id, word)
    }

    saveDict(strongId, dict);

    console.log('done\n');
  } catch (e) {
    console.log(`Error: ${e.message}`);
    console.log('Usage example: npm run import-strong -- -id mb-strong-ru');
  }
})();
