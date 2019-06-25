import { BibleVersionId } from '../../bible/bible.interfaces';

export interface Config {
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}
