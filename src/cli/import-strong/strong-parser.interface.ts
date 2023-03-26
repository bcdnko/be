import { IStrongWord } from 'core/interfaces/Bible.interfaces';

export interface StrongParser {
  parseStrong(): Promise<IStrongWord>;
}
