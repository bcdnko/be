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

(async () => {
  try {
    const args = parseArguments();
    if (!args['id'] || typeof args['id'] !== 'string' || !args['id'].length) {
      throw new Error('Stong ID was not provided. Please specify it by using -id ID');
    }

    const importId = args['id'];
    const parserDir = path.join(paths.cliScripts, 'import-strong', importId);
    const parserPath = path.join(parserDir, importId + '-parser');

    const Parser = await import(parserPath);
    const dataPath = path.join(paths.strongImportsSource, importId);

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
