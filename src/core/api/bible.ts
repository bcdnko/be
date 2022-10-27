export function fetchBibleVersions() {
  return fetch('/bible/versions.json')
    .then(res => res.json());
}

export function fetchBibleBooks(versionId: string) {
  return fetch(`/bible/versions/${encodeURIComponent(versionId)}/books.json`)
    .then(res => res.json());
}

