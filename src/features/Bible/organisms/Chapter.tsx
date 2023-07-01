import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from '../molecules/Verse';
import { IVerseRange } from '../../../core/interfaces/Bible.interfaces';
import { PagetopChapterSelector } from '../molecules/PagetopChapterSelector';
import { VersesSkeleton } from '../molecules/VersesSkeleton';
import { SimplePlaceholder } from '../../shared/atoms/SimplePlaceholder';
import { PageSubHeader } from '../../shared/atoms/PageSubHeader';
import { useEffect } from 'react';
import {
  getNextChapterUrl,
  getPrevChapterUrl,
} from '../hooks/useBibleNavigate';
import { useBibleVimKeys } from '../hooks/useBibleVimKeys';
import styles from './Chapter.module.scss';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';

function scrollToTheFirstSelectedVerse(selectedVerses: IVerseRange) {
  const firstVerse = selectedVerses.length
    ? Math.min(...selectedVerses)
    : undefined;

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

type Props = {
  setStrongId: (strongId: string) => void; // TODO refactor
};

export function Chapter({ setStrongId }: Props) {
  const { chapterContext, verses } = useBibleContext();
  const { settings } = useSettingsContext();

  useBibleVimKeys();

  const prevChapterLink = chapterContext && getPrevChapterUrl(chapterContext);
  const nextChapterLink = chapterContext && getNextChapterUrl(chapterContext);

  useEffect(() => {
    // TODO resolve dependency problem (can't depend on selectedVerses)
    if (chapterContext && verses) {
      scrollToTheFirstSelectedVerse(chapterContext.selectedVerses);
    }
  }, [chapterContext, verses]);

  const chapters = settings.chapter.showChapterList ? (
    <PagetopChapterSelector />
  ) : undefined;

  const bookHeader =
    chapterContext &&
    (settings.chapter.fullBookHeader
      ? chapterContext.book.title
      : chapterContext.book.titleShort);

  const chapterHeader = chapterContext && (
    <>
      {chapterContext.book.chapterTitle || 'Chapter'} {chapterContext.chapter}
    </>
  );

  return (
    <>
      <div className="scroll-anchor"></div>

      <ChapterToolbar />

      <div className={styles.wrapper}>
        {(settings.chapter.hugePrevNextChapterBtns && prevChapterLink && (
          <Link
            to={prevChapterLink}
            className={['fs-5', styles.chapterNav, styles.chapterPrev].join(
              ' '
            )}
          >
            <span>◄</span>
          </Link>
        )) || <div className={styles.chapterNav}></div>}

        <div className={['chapter', styles.content].join(' ')}>
          {chapters}

          <PageHeader>{bookHeader || <SimplePlaceholder xs={10} />}</PageHeader>

          <PageSubHeader>
            {chapterHeader || <SimplePlaceholder xs={3} />}
          </PageSubHeader>

          {!verses || !chapterContext ? (
            <VersesSkeleton />
          ) : (
            verses.map((verse) => (
              <Verse
                key={`${Object.values(chapterContext).join('_')}_${verse.no}`}
                verse={verse}
                selectedVerses={chapterContext.selectedVerses}
                setStrongId={setStrongId}
              />
            ))
          )}

          {chapters}
        </div>

        {(settings.chapter.hugePrevNextChapterBtns && nextChapterLink && (
          <Link
            to={nextChapterLink}
            className={['fs-5', styles.chapterNav, styles.chapterNext].join(
              ' '
            )}
          >
            <span>►</span>
          </Link>
        )) || <div className={styles.chapterNav}></div>}
      </div>
    </>
  );
}
