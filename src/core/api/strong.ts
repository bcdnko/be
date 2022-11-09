import { IStrongWord } from '../interfaces/Bible.interfaces';
import { url } from '../util/url';

export function fetchStrongWord(
  dictionaryId: string,
  strongId: string,
): Promise<IStrongWord> {
  return fetch(url(['dicts', dictionaryId, strongId + '.json']))
    .then(res => res.json());
}
