import { useCallback } from 'react';
import { VerseRef } from '../../../../core/interfaces/Bible.interfaces';
import { useMarksStorage } from '../../../hooks/storage/useMarksStorage';
import {
  VerseMarks,
  VerseMarkSymbol,
} from '../../../services/marks/marks-api.interfaces';
import { MarkSymbol } from '../atoms/MarkSymbol';

interface Props {
  verseRef: VerseRef;
  marks: {
    marks: VerseMarks;
    addMark: ReturnType<typeof useMarksStorage>['addMark'];
    removeMark: ReturnType<typeof useMarksStorage>['removeMark'];
  };
}

export function VerseMarksSymbols({
  verseRef,
  marks: { marks, addMark, removeMark },
}: Props) {
  const toggleMark = useCallback(
    (mark: VerseMarkSymbol, currentState: boolean) => {
      if (currentState) {
        removeMark(mark, verseRef);
      } else {
        addMark(mark, verseRef);
      }
    },
    [marks, verseRef]
  );

  if (!marks) {
    return <>loading...</>;
  }

  return (
    <div>
      <MarkSymbol
        markId={VerseMarkSymbol.SYMBOL_EXCLAMATION}
        state={Boolean(marks[VerseMarkSymbol.SYMBOL_EXCLAMATION])}
        toggle={toggleMark}
      />

      <MarkSymbol
        markId={VerseMarkSymbol.SYMBOL_QUESTION}
        state={Boolean(marks[VerseMarkSymbol.SYMBOL_QUESTION])}
        toggle={toggleMark}
      />

      <MarkSymbol
        markId={VerseMarkSymbol.SYMBOL_HEART}
        state={Boolean(marks[VerseMarkSymbol.SYMBOL_HEART])}
        toggle={toggleMark}
      />

      <MarkSymbol
        markId={VerseMarkSymbol.SYMBOL_STAR}
        state={Boolean(marks[VerseMarkSymbol.SYMBOL_STAR])}
        toggle={toggleMark}
      />
    </div>
  );
}
