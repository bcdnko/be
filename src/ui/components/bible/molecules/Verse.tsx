import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IBibleTextToken,
  IBibleVerse,
  IVerseRange,
} from '../../../../core/interfaces/Bible.interfaces';
import { ISettings } from '../../../../core/interfaces/common.interfaces';
import { useSettingsContext } from '../../../context/SettingsContext';
import { useMarksStorage } from '../../../hooks/storage/useMarksStorage';
import { VerseMarks } from '../../../services/marks/marks-api.interfaces';
import { VerseMarksSymbols } from '../../marks/molecules/VerseMarksSymbols';
import { StrongWord } from '../../strong/atoms/StrongWord';
import { VerseNumber } from '../atoms/VerseNumber';
import styles from './Verse.module.scss';

function markersToClassNames(markers?: string[]) {
  return (markers || [])
    .map((marker) => {
      if (marker === 'Jesus') {
        return styles.Jesus;
      }

      if (marker === 'i') {
        return styles.i;
      }

      console.log('Unknown marker', marker);

      return styles.unknown;
    })
    .join(' ');
}

function highlightedClassNames(settings: ISettings): string {
  return [
    settings.chapter.highlightJesusWords ? styles.highlightJesusWords : '',
  ]
    .filter((c) => !!c)
    .join(' ');
}

interface Props {
  verse: IBibleVerse;
  selectedVerses: IVerseRange;
  setStrongId: (strongId: string) => void;
  marks: {
    marks: VerseMarks;
    addMark: ReturnType<typeof useMarksStorage>['addMark'];
    removeMark: ReturnType<typeof useMarksStorage>['removeMark'];
  };
}

export const Verse: React.FC<Props> = ({
  verse,
  selectedVerses,
  setStrongId,
  marks,
}) => {
  const { settings } = useSettingsContext();
  const navigate = useNavigate();

  const mapToken = (token: IBibleTextToken, key: number) => {
    const classNames = markersToClassNames(token.markers);

    if (['word', 'punctuation'].includes(token.type)) {
      return (
        <span
          key={key}
          className={classNames}
        >
          {token.text}
        </span>
      );
    } else if (token.type === 'strong') {
      const strongId = token.text;

      if (!settings.chapter.showStrong) {
        return;
      }

      return (
        <StrongWord
          key={key}
          strongId={strongId}
          onClick={(e) => {
            setStrongId(strongId);
            e.stopPropagation();
          }}
        />
      );
    } else if (token.type === 'space') {
      return <React.Fragment key={key}> </React.Fragment>;
    }

    return <>UNKNOWN TOKEN</>;
  };

  const isSelected = selectedVerses.includes(verse.no);

  return (
    <div
      id={'v-' + verse.no}
      className={[
        styles.verse,
        isSelected && styles.selected,
        highlightedClassNames(settings),
      ].join(' ')}
      onClick={() => {
        // TODO change to the native function
        navigate('#' + verse.no, { preventScrollReset: true });
      }}
    >
      {settings.chapter.showVerseNumber && (
        <VerseNumber
          no={verse.no}
          selectedVerses={selectedVerses}
          isSelected={isSelected}
        />
      )}

      <div>
        <p>{verse.textParsed.map((token, i) => mapToken(token, i))}</p>
        <VerseMarksSymbols
          verseRef={{
            bookId: verse.bookId,
            chapter: verse.chapter,
            verseNum: verse.no,
          }}
          marks={marks}
        />
      </div>
    </div>
  );
};
