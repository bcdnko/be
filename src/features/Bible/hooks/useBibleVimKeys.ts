import { useEffect } from 'react';
import { copySelectedVersesAction } from '../../shared/actions/useVerseSelectionActions';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { useBibleSearchContext } from '../../shared/contexts/BibleSearchContext';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { useBibleNavigate } from './useBibleNavigate';

interface KeyMap {
  key: (e: KeyboardEvent) => boolean;
  action: () => void;
}

export function useBibleVimKeys(): void {
  const { settings, updateSettings } = useSettingsContext();
  const bibleContext = useBibleContext();
  const { chapterContext, verses } = bibleContext;
  const { focusSearch } = useBibleSearchContext();
  const { changeActiveVerse, goToPrevChapter, goToNextChapter } =
    useBibleNavigate();

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!settings.chapter.vimKeys) {
        return;
      }

      const activeTag = document.activeElement?.tagName;

      if (activeTag && ['INPUT', 'TEXTAREA'].includes(activeTag)) {
        return;
      }

      const currentVerseNumber = chapterContext?.selectedVerses[0] || 0;

      const keymap: KeyMap[] = [
        {
          key: (e) => e.key === 'Escape',
          action: () => changeActiveVerse(undefined, undefined),
        },
        {
          key: (e) => e.key === 'j' || e.key === 'ArrowDown',
          action: () => changeActiveVerse(currentVerseNumber + 1, verses),
        },
        {
          key: (e) => e.key === 'k' || e.key === 'ArrowUp',
          action: () => changeActiveVerse(currentVerseNumber - 1, verses),
        },
        {
          key: (e) => e.key === 'h' || e.key === 'ArrowLeft',
          action: () => goToPrevChapter(),
        },
        {
          key: (e) => e.key === 'l' || e.key === 'ArrowRight',
          action: () => goToNextChapter(),
        },
        {
          key: (e) => e.key === 'b' && e.ctrlKey,
          action: () => changeActiveVerse(currentVerseNumber - 14, verses),
        },
        {
          key: (e) => e.key === 'f' && e.ctrlKey,
          action: () => changeActiveVerse(currentVerseNumber + 14, verses),
        },
        {
          key: (e) => e.key === 'u' && e.ctrlKey,
          action: () => changeActiveVerse(currentVerseNumber - 6, verses),
        },
        {
          key: (e) => e.key === 'd' && e.ctrlKey,
          action: () => changeActiveVerse(currentVerseNumber + 6, verses),
        },
        {
          key: (e) => e.key === 'g',
          action: () => changeActiveVerse(1, verses),
        },
        {
          key: (e) => e.key === 'G',
          action: () => verses && changeActiveVerse(verses.length, verses),
        },
        {
          key: (e) => e.key === '/',
          action: () => focusSearch(),
        },

        {
          key: (e) => e.key === 's',
          action: () =>
            updateSettings((settings) => {
              settings.chapter.showStrong = !settings.chapter.showStrong;
              return settings;
            }),
        },

        {
          key: (e) => e.key.toLowerCase() === 'y',
          action: () => copySelectedVersesAction(bibleContext),
        },
      ];

      for (let entry of keymap) {
        if (!entry.key(e)) {
          continue;
        }

        e.preventDefault();
        entry.action();
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [
    // TODO optimize
    chapterContext?.selectedVerses,
    settings,
    verses,
    updateSettings,
    changeActiveVerse,
    goToPrevChapter,
    goToNextChapter,
    bibleContext,
    focusSearch,
  ]);
}
