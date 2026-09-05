import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../context/SettingsContext';
import { PageHeader } from '../../core/atoms/PageHeader';
import { ChapterToolbar } from '../molecules/ChapterToolbar';
import { Verse } from '../molecules/Verse';
import { IVerseRange } from '../../../../core/interfaces/Bible.interfaces';
import { PagetopChapterSelector } from '../molecules/PagetopChapterSelector';
import { VersesSkeleton } from '../molecules/VersesSkeleton';
import { SimplePlaceholder } from '../../core/atoms/SimplePlaceholder';
import { PageSubHeader } from '../../core/atoms/PageSubHeader';
import { useEffect } from 'react';
import {
  getNextChapterUrl,
  getPrevChapterUrl,
} from '../../../hooks/actions/bible/useBibleNavigate';
import { useBibleVimKeys } from '../../../hooks/actions/bible/useBibleVimKeys';
import styles from './Chapter.module.scss';
import { useBibleContext } from '../../../context/BibleChapterContext';
import { useMarksStorage } from '../../../hooks/storage/useMarksStorage';

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
  const { chapterRef, chapterContext, verses } = useBibleContext();
  const { settings } = useSettingsContext();
  const marks = useMarksStorage(chapterRef);

  useEffect(() => {
    console.log(111, marks.marks[1]);
  }, [marks]);

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

      <ChapterToolbar marks={marks} />

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
                marks={{
                  ...marks,
                  marks: marks.marks[verse.no] ?? {},
                }}
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
