import { Link, useNavigate } from 'react-router-dom';
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
import { useEffect } from 'react';
import styles from './Chapter.module.scss';

type Props = {
  versionId: string,
  book?: BibleBookStored,
  chapter: number,
  verses?: BibleVerse[],
  selectedVerses: IVerseSelection,
}

function scrollToTheFirstSelectedVerse(selectedVerses: IVerseSelection, verses: any) {
  if (verses && selectedVerses.length) {
    const firstSelectedVerse = document.getElementById('v-' + Math.min(...selectedVerses));
    if (firstSelectedVerse) {
      firstSelectedVerse.scrollIntoView({ block: 'center' });
    }
  }
}

export const Chapter: React.FC<Props> = ({
  versionId,
  book,
  chapter,
  verses,
  selectedVerses,
}) => {
  const { settings } = useSettingsContext();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTheFirstSelectedVerse(selectedVerses, verses);
  }, [versionId, book && book.id, chapter]);

  function changeActiveVerse(no: number): void {
    if (!verses) {
      return;
    }

    if (no > verses.length) {
      no = verses.length;
    }

    if (no < 1) {
      no = 1;
    }

    navigate('#' + no, { preventScrollReset: true });

    document
    .getElementById('v-' + no)
    ?.scrollIntoView({ block: 'center'});
  }

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!verses) {
        return;
      }

      if (settings.chapter.vimKeys) {
        if (e.key === 'Escape') {
          navigate('#', { preventScrollReset: true });
        }

        const currentVerseNumber = (selectedVerses[0] || 0);

        if (e.key === 'j') {
          changeActiveVerse(currentVerseNumber + 1);
        }

        if (e.key === 'k') {
          changeActiveVerse(currentVerseNumber - 1);
        }

        if (e.key === 'b' && e.ctrlKey) {
          changeActiveVerse(currentVerseNumber - 14);
          e.preventDefault();
        }

        if (e.key === 'f' && e.ctrlKey) {
          changeActiveVerse(currentVerseNumber + 14);
          e.preventDefault();
        }

        if (e.key === 'u' && e.ctrlKey) {
          changeActiveVerse(currentVerseNumber - 6);
          e.preventDefault();
        }

        if (e.key === 'd' && e.ctrlKey) {
          changeActiveVerse(currentVerseNumber + 6);
          e.preventDefault();
        }

        if (e.key === 'g') {
          changeActiveVerse(1);
        }

        if (e.key === 'G') {
          changeActiveVerse(verses.length);
        }
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [selectedVerses, settings.chapter.vimKeys]);

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
        <ChapterToolbar
          selectedVerses={selectedVerses}
          book={book}
          chapter={chapter}
        />

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
