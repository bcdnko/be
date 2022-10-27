import React from 'react';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleTextToken, BibleVerse } from '../../../core/interfaces/Bible.interfaces';
import { ISettings } from '../../../core/interfaces/common.interfaces';
import styles from './Verse.module.scss';

type Props = {
  verse: BibleVerse,
}

function VerseNumber(verseNumber: number) {
  return <>
    <span>{verseNumber}.</span>
    &nbsp;
  </>;
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
}) => {
  const { settings } = useSettingsContext();

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

  const text = () => {
    return (
      <>
        {settings.chapter.showVerseNumber && VerseNumber(verse.no)}

        {verse.textParsed.map(token =>
          <span className={markersToClassNames(token.markers)}>
            {mapToken(token)}
          </span>
        )}
      </>
    );
  };

  return (<>{
      settings.chapter.splitVerses
        ? <p className={highlightedClassNames(settings)}>{text()}</p>
        : <span className={highlightedClassNames(settings)}>{text()}</span>
    } </>);
}
