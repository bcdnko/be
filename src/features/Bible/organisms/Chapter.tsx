import React, { useEffect, useState }  from 'react';
import { fetchVerses } from '../../../core/api/bible';
import { BibleBookStored, BibleVerseStored } from '../../../core/interfaces/Bible.interfaces';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { Verse } from './Verse';

type Props = {
  versionId: string,
  book: BibleBookStored,
  chapter: number,
}

export const Chapter: React.FC<Props> = ({
  versionId,
  book,
  chapter,
}) => {
  const [verses, setVerses] = useState<BibleVerseStored[]>([]);

  useEffect(() => {
    fetchVerses(versionId, book.id, chapter)
      .then(verses => setVerses(verses));
  }, [versionId, book.id, chapter])

  return (<>
    <PageHeader>{book.title}</PageHeader>
    <h2>Chapter {chapter}</h2>
    {verses.map(verse => <Verse verse={verse} />)}
  </>);
}
