import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IBibleTextToken,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import { ISettings } from '../../../core/interfaces/common.interfaces';
import { VerseMarksSymbol } from '../../Marks/molecules/Marks';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { StrongWord } from '../../StrongDictionary/atoms/StrongWord';
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

type Props = {
  verse: IBibleVerse;
  selectedVerses: IVerseRange;
  setStrongId: (strongId: string) => void;
};

export const Verse: React.FC<Props> = ({
  verse,
  selectedVerses,
  setStrongId,
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
      const handleClick = () => setStrongId(strongId);

      if (!settings.chapter.showStrong) {
        return;
      }

      return (
        <StrongWord
          key={key}
          strongId={strongId}
          onClick={handleClick}
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
      onMouseDown={() => {
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
        <VerseMarksSymbol
          verseRef={{
            versionId: undefined,
            bookId: verse.bookId,
            chapter: verse.chapter,
            verseNum: verse.no,
          }}
        />
      </div>
    </div>
  );
};
