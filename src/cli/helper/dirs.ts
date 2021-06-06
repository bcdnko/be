const path = require('path');

const appRoot = require('app-root-path').toString();
const importsSource = path.join(appRoot, 'imports');
const cliScripts = path.join(appRoot, 'src', 'cli');
const importScripts = path.join(cliScripts, 'import');
const bibleImportsSource = path.join(importsSource, 'bible');
const strongImportsSource = path.join(importsSource, 'strong');
const bibleVersions = path.join(appRoot, 'public', 'bible', 'versions');
const strongDicts = path.join(appRoot, 'public', 'dicts');

module.exports = {
  appRoot,
  cliScripts,
  importsSource,
  importScripts,
  bibleImportsSource,
  bibleVersions,
  strongImportsSource,
  strongDicts,
};
