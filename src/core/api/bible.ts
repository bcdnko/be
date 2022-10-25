export function fetchBibleVersions() {
  return fetch('/bible/versions.json')
    .then(res => res.json());
}

export function fetchBibleBooks(versionId: string) {
  return fetch(`/bible/versions/${encodeURIComponent(versionId)}/books.json`)
    .then(res => res.json());
}

export function fetchVerses(
  versionId: string,
  bookId: number,
  chapter: number,
) {
  return fetch(`/bible/versions/${encodeURIComponent(versionId)}/books/${encodeURIComponent(bookId)}/${encodeURIComponent(chapter)}.json`)
    .then(res => res.json());
}
