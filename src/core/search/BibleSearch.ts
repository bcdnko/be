export const bibleSearchDbSchema = Object.freeze({
  versionId: 'string',
  bookId: 'number',
  ref: 'string',
  chapter: 'number',
  no: 'number',
  text: 'string',
});

export type BibleSearchDbSchema = typeof bibleSearchDbSchema;
