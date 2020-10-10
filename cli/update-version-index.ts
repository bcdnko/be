const fs = require('fs');
const path = require('path');

const appRoot = require('app-root-path').toString();
const importsPath = path.join(appRoot, 'src', 'assets', 'bible');

export function updateIndex(importsPath: string): void {
  const versionsPath = path.join(importsPath, 'versions');
  const dir = fs.readdirSync(versionsPath);
  const versions = dir.filter(item => item.endsWith('.json'))
    .map(file => {
      return JSON.parse(fs.readFileSync(path.join(versionsPath, file)).toString());
    });

  fs.writeFileSync(
    path.join(versionsPath, '..', 'versions.json'),
    JSON.stringify(versions),
  );
}

updateIndex(importsPath);

