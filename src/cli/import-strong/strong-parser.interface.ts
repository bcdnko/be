import { StrongWord } from 'core/interfaces/Bible.interfaces';

export interface StrongParser {
  parseStrong(): Promise<StrongWord>;
}

