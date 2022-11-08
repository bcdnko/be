import { useEffect } from 'react';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBookStored, BibleVerse, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';
import { useBibleClipboard } from './useBibleClipboard';
import { useBibleNavigate } from './useBibleNavigate';

type Props = {
  versionId: string,
  chapter: number,
  selectedVerses: IVerseSelection,
  book?: BibleBookStored,
  verses?: BibleVerse[],
};

export function useBibleVimKeys({
  versionId,
  chapter,
  selectedVerses,
  book,
  verses,
}: Props): void {
  const { settings, updateSettings } = useSettingsContext();
  const { copySelectedVerses } = useBibleClipboard(chapter, selectedVerses, verses, book);
  const nav = useBibleNavigate({ versionId, chapter, book, verses });

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!verses) {
        return;
      }

      if (settings.chapter.vimKeys) {
        if (e.key === 'Escape') {
          nav.changeActiveVerse(null);
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
          nav.changeActiveVerse(currentVerseNumber + 1);
        }

        if (e.key === 'k' || e.key === 'ArrowUp') {
          nav.changeActiveVerse(currentVerseNumber - 1);
        }

        if (e.key === 'h' || e.key === 'ArrowLeft') {
          nav.goToPrevChapter();
        }

        if (e.key === 'l' || e.key === 'ArrowRight') {
          nav.goToNextChapter();
        }

        if (e.key === 'b' && e.ctrlKey) {
          nav.changeActiveVerse(currentVerseNumber - 14);
          e.preventDefault();
        }

        if (e.key === 'f' && e.ctrlKey) {
          nav.changeActiveVerse(currentVerseNumber + 14);
          e.preventDefault();
        }

        if (e.key === 'u' && e.ctrlKey) {
          nav.changeActiveVerse(currentVerseNumber - 6);
          e.preventDefault();
        }

        if (e.key === 'd' && e.ctrlKey) {
          nav.changeActiveVerse(currentVerseNumber + 6);
          e.preventDefault();
        }

        if (e.key.toLowerCase() === 'y') {
          copySelectedVerses();
          e.preventDefault();
        }

        if (e.key === 'g') {
          nav.changeActiveVerse(1);
        }

        if (e.key === 'G') {
          nav.changeActiveVerse(verses.length);
        }
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [copySelectedVerses, nav, selectedVerses, settings, updateSettings, verses]);
}
