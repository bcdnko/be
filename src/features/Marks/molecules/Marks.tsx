import { getVerseRefKey } from '../../shared/helpers/verse';
import { useBibleVerseMarks } from '../../shared/hooks/userStorage/idb/useBibleVerseMarks';
import { VerseRef } from '../../shared/hooks/userStorage/types/refs';
import { MarkSymbol } from '../atoms/MarkSymbol';

interface Props {
  verseRef: VerseRef;
  marks: ReturnType<typeof useBibleVerseMarks>;
}

const enum Symbols {
  Exclamation = '!',
  Question = '?',
  Heart = '♡',
  Star = '★',
}

export function Marks({ verseRef, marks: { marks, putMark } }: Props) {
  const key = getVerseRefKey(verseRef);
  const verseMarks = marks[key];

  return (
    <div>
      <MarkSymbol
        symbol={Symbols.Exclamation}
        state={Boolean(verseMarks && verseMarks[Symbols.Exclamation])}
        toggle={() => putMark(verseRef.verseNum, Symbols.Exclamation)}
      />

      <MarkSymbol
        symbol={Symbols.Question}
        state={Boolean(verseMarks && verseMarks[Symbols.Question])}
        toggle={() => putMark(verseRef.verseNum, Symbols.Question)}
      />

      <MarkSymbol
        symbol={Symbols.Heart}
        state={Boolean(verseMarks && verseMarks[Symbols.Heart])}
        toggle={() => putMark(verseRef.verseNum, Symbols.Heart)}
      />

      <MarkSymbol
        symbol={Symbols.Star}
        state={Boolean(verseMarks && verseMarks[Symbols.Star])}
        toggle={() => putMark(verseRef.verseNum, Symbols.Star)}
      />
    </div>
  );
}
