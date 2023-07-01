import { IStrongWord } from '../../../../../../core/interfaces/Bible.interfaces';
import { url } from '../../../../../../core/util/url';

export function fetchStrongWord(
  dictionaryId: string,
  strongId: string
): Promise<IStrongWord> {
  return fetch(url(['dicts', dictionaryId, strongId + '.json'])).then((res) =>
    res.json()
  );
}
