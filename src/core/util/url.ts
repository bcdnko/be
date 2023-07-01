function normalizeHash(hash?: string) {
  if (hash === undefined) {
    return '';
  }

  if (typeof hash === 'string' && hash[0] !== '#') {
    return '#' + hash;
  }

  return hash;
}

export function url(paths: (string | number)[], hash?: string): string {
  return (
    '/' +
    paths
      .map((c) => c.toString())
      .filter((c) => c.length)
      .map((c) => encodeURIComponent(c))
      .join('/') +
    normalizeHash(hash)
  );
}
