import React from 'react';
import { BibleVerseStored } from '../../../core/interfaces/Bible.interfaces';

type Props = {
  verse: BibleVerseStored,
}

export const Verse: React.FC<Props> = ({
  verse,
}) => {
  return (<>
    <p>{verse.no}. {verse.text}</p>
  </>);
}
