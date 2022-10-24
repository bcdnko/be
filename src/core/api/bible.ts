export function getBibleVersions() {
  return fetch('/bible/versions.json')
    .then(res => res.json());
}

export function getBibleBooks(versionId: string) {
  return fetch(`/bible/versions/${encodeURIComponent(versionId)}/books.json`)
    .then(res => res.json());
}

