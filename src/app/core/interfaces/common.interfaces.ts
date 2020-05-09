import { BibleVersionId } from '../../bible/bible.interfaces';

export interface Config {
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}

export interface Settings {
  bible: {
    showStrong: boolean,
  }
}

export interface AppState {
  started: boolean;
}

export interface User {
  name: string;
  settings: Settings;
}

