import { useMemo } from 'react';
import {
  IBibleChapterRef,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';

type Props = {
  chapterRef: IBibleChapterRef | null;
  verses: IBibleVerse[] | null;
  selectedVerses: IVerseRange;
};

export function useBibleClipboard({
  chapterRef,
  selectedVerses,
  verses,
}: Props) {
  return useMemo(
    () => ({
      copySelectedVerses: function () {
        if (!verses || !chapterRef) {
          alert('The chapter is still loading');
          return;
        }

        function prepareText(verse: IBibleVerse): string {
          return verse.textParsed
            .filter((token) => token.type !== 'strong')
            .map((token) => token.text)
            .join('');
        }

        const mappedVerses = selectedVerses.map((no) =>
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
          chapterRef.book.titleShort +
          ' ' +
          chapterRef.chapter +
          (mappedVerses.length === 1 ? ':' + selectedVerses[0] : '');
        const copy = text.join('') + reference;

        console.log(copy);

        navigator.clipboard.writeText(copy);
      },
    }),
    [chapterRef, selectedVerses, verses]
  );
}
