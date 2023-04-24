export function url(paths: string[], hash?: string): string {
  return (
    '/' +
    paths
      .filter((c) => c.length)
      .map((c) => encodeURIComponent(c))
      .join('/') +
    (hash === undefined ? '' : '#' + hash)
  );
}
