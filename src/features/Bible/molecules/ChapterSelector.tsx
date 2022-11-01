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
            <Link to={`/bible/${versionId}/${book.id}/${_chapter}`}>
              {_chapter}
            </Link>
            {' '}
          </li>
        })}
      </ul>
    </div>
  );
}
