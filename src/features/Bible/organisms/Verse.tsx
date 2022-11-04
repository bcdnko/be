import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleTextToken, BibleVerse, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';
import { ISettings } from '../../../core/interfaces/common.interfaces';
import { StrongWord } from '../../StrongDictionary/atom/StrongWord';
import { VerseNumber } from '../atoms/VerseNumber';
import styles from './Verse.module.scss';

type Props = {
  verse: BibleVerse,
  selectedVerses: IVerseSelection,
  setStrongId: (strongId: string) => void,
}

function markersToClassNames(markers?: string[]) {
  return (markers || []).map(marker => {
    if (marker === 'Jesus') {
      return styles.Jesus;
    }

    if (marker === 'i') {
      return styles.i;
    }

    console.log('Unknown marker', marker)

    return styles.unknown;
  }).join(' ');
}

function highlightedClassNames(settings: ISettings): string {
  return [
    settings.chapter.highlightJesusWords ? styles.highlightJesusWords : '',
  ].join(' ');
}

export const Verse: React.FC<Props> = ({
  verse,
  selectedVerses,
  setStrongId,
}) => {
  const { settings } = useSettingsContext();
  const navigate = useNavigate();

  const mapToken = (token: BibleTextToken) => {
    if (token.type === 'word') {
      return <>{token.text}</>;
    } else if (token.type === 'punctuation') {
      return <>{token.text}</>;
    } else if (token.type === 'strong') {
      const strongId = token.text;
      const handleClick = () => setStrongId(strongId);

      return settings.chapter.showStrong
        ? <StrongWord strongId={strongId} onClick={handleClick} />
        : null;
    } else if (token.type === 'space') {
      return <>{' '}</>;
    }

    return <>UNKNOWN TOKEN</>;
  }

  const isSelected = selectedVerses.includes(verse.no);

  return (
    <p id={'v-' + verse.no}
      className={[
        styles.verse,
        isSelected ? styles.selected : null,
        highlightedClassNames(settings),
      ].join(' ')}
      onMouseDown={() => {
        navigate(
          '#' + verse.no,
          { preventScrollReset: true },
        );
      }}
    >
      <span className="content" style={{ display: 'flex' }}>
        {settings.chapter.showVerseNumber &&
          <VerseNumber
            no={verse.no}
            selectedVerses={selectedVerses}
            isSelected={isSelected}
          />
        }

        <span>
          {verse.textParsed.map((token, i) =>
            <span
              key={i}
              className={markersToClassNames(token.markers)}
            >
              {mapToken(token)}
            </span>
          )}
        </span>
      </span>
    </p>
  );
}
