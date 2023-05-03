import { useEffect } from 'react';
import {
  IBibleChapterRef,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { useBibleClipboard } from './useBibleClipboard';
import { useBibleNavigate } from './useBibleNavigate';

interface KeyMap {
  key: (e: KeyboardEvent) => boolean;
  action: () => void;
}

type Props = {
  chapterRef?: IBibleChapterRef;
  verses?: IBibleVerse[];
  selectedVerses: IVerseRange;
  focusSearch: () => void;
};

export function useBibleVimKeys({
  chapterRef,
  verses,
  selectedVerses,
  focusSearch,
}: Props): void {
  const { settings, updateSettings } = useSettingsContext();
  const { copySelectedVerses } = useBibleClipboard({
    chapterRef,
    verses,
    selectedVerses,
  });
  const nav = useBibleNavigate({ chapterRef, verses });

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (!settings.chapter.vimKeys) {
        return;
      }

      const activeTag = document.activeElement?.tagName;

      if (activeTag && ['INPUT', 'TEXTAREA'].includes(activeTag)) {
        return;
      }

      const currentVerseNumber = selectedVerses[0] || 0;

      const keymap: KeyMap[] = [
        {
          key: (e) => e.key === 'Escape',
          action: () => nav.changeActiveVerse(),
        },
        {
          key: (e) => e.key === 'j' || e.key === 'ArrowDown',
          action: () => nav.changeActiveVerse(currentVerseNumber + 1),
        },
        {
          key: (e) => e.key === 'k' || e.key === 'ArrowUp',
          action: () => nav.changeActiveVerse(currentVerseNumber - 1),
        },
        {
          key: (e) => e.key === 'h' || e.key === 'ArrowLeft',
          action: () => nav.goToPrevChapter(),
        },
        {
          key: (e) => e.key === 'l' || e.key === 'ArrowRight',
          action: () => nav.goToNextChapter(),
        },
        {
          key: (e) => e.key === 'b' && e.ctrlKey,
          action: () => nav.changeActiveVerse(currentVerseNumber - 14),
        },
        {
          key: (e) => e.key === 'f' && e.ctrlKey,
          action: () => nav.changeActiveVerse(currentVerseNumber + 14),
        },
        {
          key: (e) => e.key === 'u' && e.ctrlKey,
          action: () => nav.changeActiveVerse(currentVerseNumber - 6),
        },
        {
          key: (e) => e.key === 'd' && e.ctrlKey,
          action: () => nav.changeActiveVerse(currentVerseNumber + 6),
        },
        {
          key: (e) => e.key === 'g',
          action: () => nav.changeActiveVerse(1),
        },
        {
          key: (e) => e.key === 'G',
          action: () => verses && nav.changeActiveVerse(verses.length),
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
          action: () => copySelectedVerses(),
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
    copySelectedVerses,
    nav,
    selectedVerses,
    settings,
    updateSettings,
    verses,
    focusSearch,
  ]);
}
