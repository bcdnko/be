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
import { isOffscreen } from '../../../core/util/htmlView';
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
  const { settings, updateSettings } = useSettingsContext();
  const navigate = useNavigate();

  const prevChapterLink = book ? BibleNavigationService.getPreviousChapterUrl(versionId, book, chapter) : null;
  const nextChapterLink = book ? BibleNavigationService.getNextChapterUrl(versionId, book, chapter) : null;

  function copySelectedVerses() {
    if (!verses || !book) {
      alert('The chapter is still loading');
      return;
    }

    function prepareText(verse: BibleVerse): string {
      return verse.textParsed
        .filter(token => token.type !== 'strong')
        .map(token => token.text)
        .join('');
    }

    const mappedVerses = selectedVerses.map(no => verses.find(v => v.no === no));
    const text = mappedVerses.map(verse => {
      if (!verse) {
        return 'ERROR\n\n';
      }

      const versePrefix = mappedVerses.length === 1 ? '' : verse.no + '. ';
      return versePrefix + prepareText(verse) + '\n\n';
    });

    const reference = book.titleShort + ' ' + chapter + (mappedVerses.length === 1 ? ':' + selectedVerses[0] : '');
    const copy = text.join('') + reference;

    console.log(copy);

    navigator.clipboard.writeText(copy);
  }

  useEffect(() => {
    scrollToTheFirstSelectedVerse(selectedVerses, verses);
  }, [versionId, book && book.id, chapter, verses]);

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

    const el = document.getElementById('v-' + no);
    if (el && isOffscreen(el).any) {
      el.scrollIntoView({ block: 'center'});
    }
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

        if (e.key === 's') {
          updateSettings(settings => {
            settings.chapter.showStrong = !settings.chapter.showStrong;
            return settings;
          });
          e.preventDefault();
        }

        if (e.key === 'j' || e.key === 'ArrowDown') {
          changeActiveVerse(currentVerseNumber + 1);
        }

        if (e.key === 'k' || e.key === 'ArrowUp') {
          changeActiveVerse(currentVerseNumber - 1);
        }

        if (e.key === 'h' || e.key === 'ArrowLeft') {
          prevChapterLink && navigate(prevChapterLink);
        }

        if (e.key === 'l' || e.key === 'ArrowRight') {
          nextChapterLink && navigate(nextChapterLink);
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

        if (e.key.toLowerCase() === 'y') {
          copySelectedVerses();
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
