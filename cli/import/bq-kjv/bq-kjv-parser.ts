import {
  BibleVersion,
} from '../../../src/app/bible/bible.interfaces';
import { BqParser } from '../bq-parser';

export default class BqKjvParser extends BqParser {
  protected _chapterRegex = /^<h4>[0-9 a-zA-Z]+ (\d+)<\/h4>$/;
  protected _verseRegex = /^(<p>(\d+) (.+)$)/;

  parseVersion(): BibleVersion {
    return Object.assign(
      {},
      super.parseVersion(),
      {
        id: 'kjv',
        titleShort: 'KJV+',
        langId: 'en',
      },
    );
  }
}
