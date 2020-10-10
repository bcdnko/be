const fs = require('fs');

export function parseBqIni(path) {
    const rawModule = fs.readFileSync(path).toString();
    const module = rawModule
      .split('\n')
      .map(_ => _.trim())
      .filter(_ => !!_)
      .reduce((acc, _) => {
        if (_.indexOf('=') > -1) {
          const pair = _.split('=');
          const key = pair[0];
          if (key in acc) {
            const val = acc[key];
            acc[key] = Array.isArray(val) ? val : [val];
            acc[key].push(pair[1]);
          } else {
            acc[key] = pair[1];
          }
        }
        return acc;
      }, {});

    return module;
}
