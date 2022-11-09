import { useMemo } from 'react';
import { BibleBookStored, BibleVerse, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';

type Props = {
  chapter?: number,
  book?: BibleBookStored,
  verses?: BibleVerse[],
  selectedVerses: IVerseSelection,
};

export function useBibleClipboard({
  chapter,
  selectedVerses,
  verses,
  book,
}: Props) {
  return useMemo(() => ({
    copySelectedVerses: function() {
      if (!verses || !book) {
        alert('The chapter is still loading');
        return;
      }

      function prepareText(verse: BibleVerse): string {
        return verse.textParsed
          .filter(token => token.type !== 'strong')
          .map(token => token.text)
          .join('');
      }

      const mappedVerses = selectedVerses.map(no => verses.find(v => v.no === no));
      const text = mappedVerses.map(verse => {
        if (!verse) {
          return 'ERROR\n\n';
        }

        const versePrefix = mappedVerses.length === 1 ? '' : verse.no + '. ';
        return versePrefix + prepareText(verse) + '\n\n';
      });

      const reference = book.titleShort + ' ' + chapter + (mappedVerses.length === 1 ? ':' + selectedVerses[0] : '');
      const copy = text.join('') + reference;

      console.log(copy);

      navigator.clipboard.writeText(copy);
    }
  }), [chapter, selectedVerses, verses, book]);
}
