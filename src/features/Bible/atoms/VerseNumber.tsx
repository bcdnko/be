import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BibleVerseId,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import {
  selectionToHash,
  toggleVerse,
} from '../../shared/hooks/hashParams/useVersesFromHash';
import styles from './VerseNumber.module.scss';

type Props = {
  no: BibleVerseId;
  selectedVerses: IVerseRange;
  isSelected: boolean;
};

export const VerseNumber: React.FC<Props> = ({
  no,
  selectedVerses,
  isSelected,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <span
        className={styles.verseNumber}
        onMouseDown={(e) => {
          // TODO refactor
          navigate(
            selectionToHash(toggleVerse(selectedVerses, no, !isSelected)),
            { preventScrollReset: true }
          );
          e.stopPropagation();
        }}
      >
        {no}
      </span>
      &nbsp;
    </>
  );
};
