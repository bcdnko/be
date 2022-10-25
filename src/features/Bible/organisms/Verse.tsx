import React from 'react';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleVerseStored } from '../../../core/interfaces/Bible.interfaces';

type Props = {
  verse: BibleVerseStored,
}

function VerseNumber(verseNumber: number) {
  return <>
    <span>{verseNumber}.</span>
    &nbsp;
  </>;
}

export const Verse: React.FC<Props> = ({
  verse,
}) => {
  const { settings } = useSettingsContext();
  const text = () => {
    return (
      <>
        {settings.chapter.showVerseNumber && VerseNumber(verse.no)}
        {verse.text}
      </>
    );
  };

  return (<>{
      settings.chapter.splitVerses
        ? <p>{text()}</p>
        : <span>{text()}</span>
    } </>);
}
