import {
  BibleVersionStored,
  BibleVersion,
} from '../bible.interfaces';
import { BibleUrlService } from '../bible-url.service';

export function bibleVersionMapper(
  bibleUrlService: BibleUrlService,
  version: BibleVersionStored,
): BibleVersion {
  return {
    ...version,
    route: bibleUrlService.bibleChapter(version.id, 'gen', 1),
  };
}

