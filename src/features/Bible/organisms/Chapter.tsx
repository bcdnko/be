import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from './Verse';
import { BibleBookStored, BibleVerse, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';
import { BibleNavigationService } from '../../../core/service/BibleNavigationService';
import { PagetopChapterSelector } from '../molecules/PagetopChapterSelector';
import { VersesSkeleton } from '../molecules/VersesSkeleton';
import { PageSubHeader } from '../../shared/atoms/PageSubHeader';
import { ChapterSkeleton } from './ChapterSkeleton';
import styles from './Chapter.module.scss';

type Props = {
  versionId: string,
  book?: BibleBookStored,
  chapter: number,
  verses?: BibleVerse[],
  selectedVerses: IVerseSelection,
}

export const Chapter: React.FC<Props> = ({
  versionId,
  book,
  chapter,
  verses,
  selectedVerses,
}) => {
  const { settings } = useSettingsContext();

  const chapters = settings.chapter.showChapterList
    ? (<PagetopChapterSelector
        versionId={versionId}
        book={book}
        chapter={chapter}
      />)
    : null;

  const prevChapterLink = book ? BibleNavigationService.getPreviousChapterUrl(versionId, book, chapter) : null;
  const nextChapterLink = book ? BibleNavigationService.getNextChapterUrl(versionId, book, chapter) : null;

  return (
    <div style={{
      display: 'flex',
    }}>
      {
        (settings.chapter.hugePrevNextChapterBtns
        && prevChapterLink
        && <Link
          to={prevChapterLink}
          className={['fs-5', styles.chapterNav, styles.chapterPrev].join(' ')}
        ><span>◄</span></Link>) || <div className={styles.chapterNav}></div>
      }

      <div className={['chapter', styles.content].join(' ')}>
        <ChapterToolbar hasVerseSelection={!!selectedVerses.length} />

        {chapters}

        {!book && <ChapterSkeleton />}

        {book && (
          <>
            <PageHeader>
              {settings.chapter.fullBookHeader ? book.title : book.titleShort}
            </PageHeader>

            <PageSubHeader>Chapter {chapter}</PageSubHeader>

            {(verses && book)
              ? (verses.map(verse =>
                <Verse
                  key={`${versionId}_${book.id}_${chapter}_${verse.no}`}
                  verse={verse}
                  selectedVerses={selectedVerses}
                />))
              : (<VersesSkeleton />)
            }
          </>
        )}

        {chapters}
      </div>

      {
        (settings.chapter.hugePrevNextChapterBtns
        && nextChapterLink
        && <Link
          to={nextChapterLink}
          className={['fs-5', styles.chapterNav, styles.chapterNext].join(' ')}
        ><span>►</span></Link>) || <div className={styles.chapterNav}></div>
      }
    </div>
  );
}
