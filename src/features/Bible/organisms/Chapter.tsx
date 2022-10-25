import React, { useEffect, useState }  from 'react';
import { fetchVerses } from '../../../core/api/bible';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBookStored, BibleVerseStored } from '../../../core/interfaces/Bible.interfaces';
import { PageHeader } from '../../shared/atoms/PageHeader';
import {ChapterSelector} from '../molecules/ChapterSelector';
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
  const { settings } = useSettingsContext();

  useEffect(() => {
    fetchVerses(versionId, book.id, chapter)
      .then(verses => setVerses(verses));
  }, [versionId, book.id, chapter])

  const chapters = settings.chapter.showChapterList && <ChapterSelector
    versionId={versionId}
    book={book}
  />;

  return (<>
    {chapters}

    <PageHeader>{book.title}</PageHeader>
    <h2>Chapter {chapter}</h2>

    {verses.map(verse => <Verse
      key={`${versionId}_${book.id}_${chapter}_${verse.no}`}
      verse={verse}
    />)}

    {chapters}
  </>);
}
