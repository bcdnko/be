export function url(paths: string[]): string {
  return '/' + paths
    .filter(c => c.length)
    .map(c => encodeURIComponent(c))
    .join('/');
}
