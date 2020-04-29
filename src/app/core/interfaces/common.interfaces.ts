import { BibleVersionId } from '../../bible/bible.interfaces';

export interface Config {
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}

export interface AppState {
  config: Config;
}

export interface User extends Config {
  name: string;
}

