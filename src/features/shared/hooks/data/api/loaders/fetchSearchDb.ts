import { RawData } from '@orama/orama';
import { BibleVersionId } from '../../../../../../core/interfaces/Bible.interfaces';
import { url } from '../../../../../../core/util/url';

export async function fetchBibleSearchDb(
  versionId: BibleVersionId
): Promise<RawData> {
  const db = await fetch(
    url(['bible', 'versions', versionId, 'search-db.json'])
  );

  return db.json();
}
