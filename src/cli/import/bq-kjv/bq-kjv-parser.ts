import { IBibleVersionStored } from 'core/interfaces/Bible.interfaces';
import { BqParser } from '../bq-parser';

export default class BqKjvParser extends BqParser {
  protected _chapterRegex = /^<h4>[0-9 a-zA-Z]+ (\d+)<\/h4>$/;
  protected _verseRegex = /^(<p>(\d+) (.+)$)/;

  parseVersion(): IBibleVersionStored {
    return Object.assign({}, super.parseVersion(), {
      id: 'kjv',
      title: 'King James Version 1769',
      titleShort: 'King James',
      titleShortest: 'KJV+',
      langId: 'en',
    });
  }
}
