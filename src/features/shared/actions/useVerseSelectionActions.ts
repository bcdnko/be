import { IBibleVerse } from '../../../core/interfaces/Bible.interfaces';
import {
  IBibleContext,
  useBibleContext,
} from '../contexts/BibleChapterContext';

export function copySelectedVersesAction({
  verses,
  chapterContext,
}: IBibleContext) {
  if (!verses || !chapterContext) {
    // TODO handle
    alert('The chapter is still loading');
    return;
  }

  function prepareText(verse: IBibleVerse): string {
    return verse.textParsed
      .filter((token) => token.type !== 'strong')
      .map((token) => token.text)
      .join('');
  }

  const mappedVerses = chapterContext.selectedVerses.map((no) =>
    verses.find((v) => v.no === no)
  );

  const text = mappedVerses.map((verse) => {
    if (!verse) {
      return 'ERROR\n\n';
    }

    const versePrefix = mappedVerses.length === 1 ? '' : verse.no + '. ';
    return versePrefix + prepareText(verse) + '\n\n';
  });

  const reference =
    chapterContext.book.titleShort +
    ' ' +
    chapterContext.chapter +
    (mappedVerses.length === 1 ? ':' + chapterContext.selectedVerses[0] : '');

  const copy = text.join('') + reference;

  console.log(copy);

  navigator.clipboard.writeText(copy);
}

export function useVerseSelectionActions() {
  const bibleContext = useBibleContext();

  return {
    copySelectedVersesAction: () => copySelectedVersesAction(bibleContext),
  };
}
