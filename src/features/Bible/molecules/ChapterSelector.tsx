import React from 'react';
import { Link } from 'react-router-dom';
import { BibleBookStored } from '../../../core/interfaces/Bible.interfaces';

export type ChapterSelectorProps = {
  versionId: string,
  book: BibleBookStored,
  chapter: number,
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  versionId,
  book,
  chapter,
}) => {
  return (
    <div className="chapterList">
      <span>Chapters:</span>
      {' '}
      <ul>
        {[...Array(book.chapters)].map((_, i) => {
          const _chapter = i + 1;

          return <li
            className={[chapter === _chapter ? 'active' : ''].join(' ')}
            key={`${book.id}_${_chapter}`}
          >
            <Link
              to={`/bible/${versionId}/${book.id}/${_chapter}`}
              onClick={() => window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant',
              } as any)}
            >
              {_chapter}
            </Link>
            {' '}
          </li>
        })}
      </ul>
    </div>
  );
}
