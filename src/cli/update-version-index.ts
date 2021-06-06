const fs = require('fs');
const path = require('path');

const appRoot = require('app-root-path').toString();
const biblePath = path.join(appRoot, 'public', 'bible');

export function updateIndex(biblePath: string): void {
  const versionsPath = path.join(biblePath, 'versions');
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

updateIndex(biblePath);

