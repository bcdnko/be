import { useMarksContext } from '../../shared/contexts/MarksContext';
import { getVerseRefKey } from '../../shared/helpers/verse';
import {
  VerseMark,
  VerseMarkValue,
} from '../../shared/hooks/userStorage/types/marks';
import { MarksVerseRef } from '../../shared/hooks/userStorage/types/refs';
import { MarkSymbol } from '../atoms/MarkSymbol';

interface Props {
  verseRef: MarksVerseRef;
}

const enum Symbols {
  Exclamation = '!',
  Question = '?',
  Heart = '♡',
  Star = '★',
}

// TODO rename
export function VerseMarksSymbol({ verseRef }: Props) {
  const marksContext = useMarksContext();
  if (!marksContext) {
    return <></>;
  }

  const {
    marks,
    actions: { deleteMark, putMark },
  } = marksContext;

  const key = getVerseRefKey(verseRef);
  const verseMarks = marks[key];

  const toggleMark = (value: VerseMarkValue, currentState: boolean) => {
    const mark: VerseMark = {
      ...verseRef,
      type: 'symbol',
      value,
    };

    if (currentState) {
      deleteMark(mark);
    } else {
      putMark(mark);
    }
  };

  return (
    <div>
      <MarkSymbol
        symbol={Symbols.Exclamation}
        state={Boolean(verseMarks && verseMarks[Symbols.Exclamation])}
        toggle={toggleMark}
      />

      <MarkSymbol
        symbol={Symbols.Question}
        state={Boolean(verseMarks && verseMarks[Symbols.Question])}
        toggle={toggleMark}
      />

      <MarkSymbol
        symbol={Symbols.Heart}
        state={Boolean(verseMarks && verseMarks[Symbols.Heart])}
        toggle={toggleMark}
      />

      <MarkSymbol
        symbol={Symbols.Star}
        state={Boolean(verseMarks && verseMarks[Symbols.Star])}
        toggle={toggleMark}
      />
    </div>
  );
}
