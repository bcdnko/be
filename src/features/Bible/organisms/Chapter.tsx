import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { PageHeader } from '../../shared/atoms/PageHeader';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from '../molecules/Verse';
import {
  IBibleChapterRef,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import { PagetopChapterSelector } from '../molecules/PagetopChapterSelector';
import { VersesSkeleton } from '../molecules/VersesSkeleton';
import { SimplePlaceholder } from '../../shared/atoms/SimplePlaceholder';
import { PageSubHeader } from '../../shared/atoms/PageSubHeader';
import { useEffect } from 'react';
import { useBibleClipboard } from '../hooks/useBibleClipboard';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import { useBibleVimKeys } from '../hooks/useBibleVimKeys';
import styles from './Chapter.module.scss';

type Props = {
  chapterRef: IBibleChapterRef | null;
  verses: IBibleVerse[] | null;
  selectedVerses: IVerseRange;
  setStrongId: (strongId: string) => void;
};

function scrollToTheFirstSelectedVerse(
  selectedVerses: IVerseRange,
  verses: any
) {
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
  chapterRef,
  verses,
  selectedVerses,
  setStrongId,
}) => {
  const { settings } = useSettingsContext();
  const { copySelectedVerses } = useBibleClipboard({
    chapterRef,
    selectedVerses,
    verses,
  });
  const nav = useBibleNavigate({ chapterRef, verses });

  useBibleVimKeys({ chapterRef, selectedVerses, verses });

  const prevChapterLink = nav.getPrevChapterUrl();
  const nextChapterLink = nav.getNextChapterUrl();

  useEffect(() => {
    // TODO resolve dependency problem (can't depend on selectedVerses)
    scrollToTheFirstSelectedVerse(selectedVerses, verses);
  }, [chapterRef, verses]);

  const chapters = settings.chapter.showChapterList ? (
    <PagetopChapterSelector chapterRef={chapterRef} />
  ) : null;

  const bookHeader =
    chapterRef &&
    (settings.chapter.fullBookHeader
      ? chapterRef.book.title
      : chapterRef.book.titleShort);

  const chapterHeader = chapterRef && (
    <>
      {chapterRef.book.chapterTitle || 'Chapter'} {chapterRef.chapter}
    </>
  );

  return (
    <>
      <div className="scroll-anchor"></div>

      <ChapterToolbar
        chapterRef={chapterRef}
        verses={verses}
        selectedVerses={selectedVerses}
        copySelectedVerses={copySelectedVerses}
      />

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

          {!(verses && chapterRef) ? (
            <VersesSkeleton />
          ) : (
            verses.map((verse) => (
              <Verse
                key={`${Object.values(chapterRef).join('_')}_${verse.no}`}
                verse={verse}
                selectedVerses={selectedVerses}
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
};
