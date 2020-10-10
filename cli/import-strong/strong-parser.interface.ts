import { StrongWord } from '../../src/core/interfaces/Bible.interfaces';

export interface StrongParser {
  parseStrong(): Promise<StrongWord>;
}

