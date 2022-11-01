import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleTextToken, BibleVerse } from '../../../core/interfaces/Bible.interfaces';
import { ISettings } from '../../../core/interfaces/common.interfaces';
import { VerseNumber } from '../atoms/VerseNumber';
import styles from './Verse.module.scss';

type Props = {
  verse: BibleVerse,
  isSelected: boolean,
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
  isSelected,
}) => {
  const { settings } = useSettingsContext();
  const navigate = useNavigate();

  const mapToken = (token: BibleTextToken) => {
    if (token.type === 'word') {
      return <>{token.text}</>;
    } else if (token.type === 'punctuation') {
      return <>{token.text}</>;
    } else if (token.type === 'strong') {
      return settings.chapter.showStrong ? <>{' '}{token.text}</> : null;
    } else if (token.type === 'space') {
      return <>{' '}</>;
    }

    return <>UNKNOWN TOKEN</>;
  }

  return (
    <p
      className={[
        styles.verse,
        isSelected ? styles.selected : null,
        highlightedClassNames(settings),
      ].join(' ')}
      onMouseDown={() => {
        navigate(isSelected ? '#' : ('#' + verse.no), { preventScrollReset: true });
      }}
    >
      {settings.chapter.showVerseNumber && <VerseNumber no={verse.no} />}

      {verse.textParsed.map((token, i) =>
        <span key={i} className={markersToClassNames(token.markers)}>
          {mapToken(token)}
        </span>
      )}
    </p>
  );
}
