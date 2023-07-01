import { IBibleVersion } from '../../../../../../core/interfaces/Bible.interfaces';

export async function fetchBibleVersions(): Promise<IBibleVersion[]> {
  const fetchedVersions = await fetch('/bible/versions.json');
  return fetchedVersions.json();
}
