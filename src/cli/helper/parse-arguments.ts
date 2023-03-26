export function parseArguments() {
  const args = {};
  let key = null;

  for (const arg of process.argv.slice(2)) {
    if (arg && arg.length && arg[0] === '-') {
      key = arg.substring(1);
      args[key] = true;
    } else {
      args[key] = arg;
    }
  }

  return args;
}
