import { StrongWord } from '../../src/app/bible/bible.interfaces';

export interface StrongParser {
  parseStrong(): Promise<StrongWord>;
}

