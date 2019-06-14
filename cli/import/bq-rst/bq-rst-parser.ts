import {
  BibleVersion,
} from '../../../src/app/bible/bible.interfaces';
import { BqParser } from '../bq-parser';

export default class BqRstParser extends BqParser {
  parseVersion(): BibleVersion {
    return Object.assign(
      {},
      super.parseVersion(),
      {
        id: 'rst',
        titleShort: 'RST+',
        langId: 'ru',
      },
    );
  }
}
