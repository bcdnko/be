import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from './Verse';
import { BibleBookStored, BibleVerse, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';
import { PagetopChapterSelector } from '../molecules/PagetopChapterSelector';
import { VersesSkeleton } from '../molecules/VersesSkeleton';
import { PageSubHeader } from '../../shared/atoms/PageSubHeader';
import { ChapterSkeleton } from './ChapterSkeleton';
import { useEffect } from 'react';
import { useBibleClipboard } from '../hooks/useBibleClipboard';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import { useBibleVimKeys } from '../hooks/useBibleVimKeys';
import styles from './Chapter.module.scss';

type Props = {
  versionId: string,
  book?: BibleBookStored,
  chapter: number,
  verses?: BibleVerse[],
  selectedVerses: IVerseSelection,
  setStrongId: (strongId: string) => void,
}

function scrollToTheFirstSelectedVerse(selectedVerses: IVerseSelection, verses: any) {
  if (!verses) {
    return;
  }

  const firstVerse = selectedVerses.length ? Math.min(...selectedVerses) : null;

  if (!firstVerse) {
    const el = document.querySelector('.scroll-anchor');
    el?.scrollIntoView();
    return;
  }

  const el = document.getElementById('v-' + firstVerse);

  if (el) {
    el.scrollIntoView({ block: 'center' });
  }
}

export const Chapter: React.FC<Props> = ({
  versionId,
  book,
  chapter,
  verses,
  selectedVerses,
  setStrongId,
}) => {
  const { settings } = useSettingsContext();
  const { copySelectedVerses } = useBibleClipboard({ chapter, selectedVerses, verses, book });
  const nav = useBibleNavigate({ versionId, book, chapter, verses });

  useBibleVimKeys({ versionId, book, chapter, selectedVerses, verses });

  const prevChapterLink = nav.getPrevChapterUrl();
  const nextChapterLink = nav.getNextChapterUrl();

  useEffect(() => {
    // TODO resolve dependency problem (can't depend on selectedVerses)
    scrollToTheFirstSelectedVerse(selectedVerses, verses);
  }, [versionId, book, chapter, verses]);

  const chapters = settings.chapter.showChapterList
    ? (<PagetopChapterSelector
        versionId={versionId}
        book={book}
        chapter={chapter}
      />)
    : null;

  return (
    <>
      <div className="scroll-anchor"></div>

      <ChapterToolbar
        selectedVerses={selectedVerses}
        book={book}
        copySelectedVerses={copySelectedVerses}
      />

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
                    setStrongId={setStrongId}
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
    </>
  );
}
