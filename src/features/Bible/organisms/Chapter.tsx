import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import { fetchVerses } from '../../../core/api/bible/verse';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { ChapterSelector } from '../molecules/ChapterSelector';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from './Verse';
import { BibleBookStored, BibleVerse } from '../../../core/interfaces/Bible.interfaces';
import { BibleNavigationService } from '../../../core/service/BibleNavigationService';
import styles from './Chapter.module.scss';

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
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const { settings } = useSettingsContext();

  useEffect(() => {
    fetchVerses(versionId, book.id, chapter)
      .then(verses => setVerses(verses));
  }, [versionId, book.id, chapter])

  const chapters = settings.chapter.showChapterList && <ChapterSelector
    versionId={versionId}
    book={book}
  />;

  const prevChapterLink = BibleNavigationService.getPreviousChapterUrl(versionId, book, chapter);
  const nextChapterLink = BibleNavigationService.getNextChapterUrl(versionId, book, chapter);

  return (
    <div style={{
      display: 'flex',
    }}>
      {
        settings.chapter.hugePrevNextChapterBtns
        && prevChapterLink
        && <Link
          to={prevChapterLink}
          className={[styles.chapterNav, styles.chapterPrev].join(' ')}
        >◄</Link> || <div className={styles.chapterNav}></div>
      }

      <div className={styles.content}>
        <ChapterToolbar />

        {chapters}

        <PageHeader>
          {settings.chapter.fullBookHeader ? book.title : book.titleShort}
        </PageHeader>

        <h2>Chapter {chapter}</h2>

        {verses.map(verse =>
          <Verse
            key={`${versionId}_${book.id}_${chapter}_${verse.no}`}
            verse={verse}
          />
        )}

        {chapters}
      </div>

      {
        settings.chapter.hugePrevNextChapterBtns
        && nextChapterLink
        && <Link
          to={nextChapterLink}
          className={[styles.chapterNav, styles.chapterNext].join(' ')}
        >►</Link> || <div className={styles.chapterNav}></div>
      }

    </div>
  );
}
