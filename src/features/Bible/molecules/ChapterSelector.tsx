import React from 'react';
import { Link } from 'react-router-dom';
import { IBibleChapterContext } from '../../../core/interfaces/Bible.interfaces';
import { chapterUrl } from '../hooks/useBibleNavigate';

export type ChapterSelectorProps = {
  chapterContext?: IBibleChapterContext;
};

export function ChapterSelector({ chapterContext }: ChapterSelectorProps) {
  if (!chapterContext) {
    return <></>;
  }

  const { book, chapter: currentChapter } = chapterContext;

  return (
    <div className="chapterList">
      {' '}
      <ul>
        {[...Array(book.chapters)].map((_, i) => {
          const chapter = i + 1;

          return (
            <li
              className={[currentChapter === chapter ? 'active' : ''].join(' ')}
              key={`${book.id}_${chapter}`}
            >
              <Link
                to={chapterUrl({
                  versionId: chapterContext.version.id,
                  bookId: chapterContext.book.id,
                  chapter,
                })}
              >
                {chapter}
              </Link>{' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
