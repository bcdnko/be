import { z } from 'zod';

const ChapterSchema = z.object({
  showVerseNumber: z.boolean(),
  showChapterList: z.boolean(),
  fullBookHeader: z.boolean(),
  showStrong: z.boolean(),
  highlightJesusWords: z.boolean(),
  hugePrevNextChapterBtns: z.boolean(),
  vimKeys: z.boolean(),
});

const BookSelectorSchema = z.object({
  showChaptersDropDown: z.boolean(),
});

export const SettingsSchema = z.object({
  version: z.number(),
  general: z.object({
    showGoToTopButton: z.boolean(),
    defaultBibleVersionId: z.string(),
    defaultDictionaryId: z.string(),
  }),
  chapter: ChapterSchema,
  bookSelector: BookSelectorSchema,
});

export type ISettings = z.infer<typeof SettingsSchema>;
export type IBookSelectorSettings = z.infer<typeof BookSelectorSchema>;
export type IChapterSettings = z.infer<typeof ChapterSchema>;
