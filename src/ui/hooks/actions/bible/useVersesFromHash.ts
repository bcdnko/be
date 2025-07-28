import { useMemo } from 'react';
import {
  BibleVerseId,
  IVerseRange,
} from '../../../../core/interfaces/Bible.interfaces';
import { cloneDeepJson } from '../../../../core/util/serialization';

function getSelectedVersesFromHash(hashString: string): IVerseRange {
  const hash = hashString.slice(1);

  if (!hash.length) {
    return [];
  }

  // TODO validate
  const groups = hash.split(';').flatMap((group) => {
    const values = group.split('-').map((verseNo) => parseInt(verseNo));

    if (values.length > 1) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const arr = [];

      for (let i = min; i <= max; i++) {
        arr.push(i);
      }

      return arr;
    }

    return values;
  });

  return groups;
}

export function selectionToHash(selectedVerses: IVerseRange): string {
  return '#' + selectedVerses.join(';');
}

export function toggleVerse(
  selectedVerses: IVerseRange,
  verseNo: BibleVerseId,
  flag: boolean
): IVerseRange {
  let selected = cloneDeepJson(selectedVerses);

  if (flag) {
    selected.push(verseNo);
  } else {
    selected = selected.filter((value) => value !== verseNo);
  }

  selected.sort((a, b) => a - b);

  return selected;
}

export function useVersesFromHash() {
  const hash = window.location.hash;
  const selectedVerses = useMemo(() => getSelectedVersesFromHash(hash), [hash]);

  return {
    selectedVerses,
  };
}
