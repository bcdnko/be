import React from 'react';
import { Link } from 'react-router-dom';
import { IBibleChapterRef } from '../../../core/interfaces/Bible.interfaces';
import { useBibleNavigate } from '../hooks/useBibleNavigate';

export type ChapterSelectorProps = {
  chapterRef: IBibleChapterRef | null;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({ chapterRef }) => {
  const { chapterUrl } = useBibleNavigate({ chapterRef });

  if (!chapterRef) {
    return <></>;
  }

  return (
    <div className="chapterList">
      {' '}
      <ul>
        {[...Array(chapterRef.book.chapters)].map((_, i) => {
          const chapter = i + 1;

          return <li
            className={[chapterRef?.chapter === chapter ? 'active' : ''].join(' ')}
            key={`${chapterRef.book.id}_${chapter}`}
          >
            <Link to={chapterUrl(chapterRef.version.id, chapterRef.book.id, chapter)}>
              {chapter}
            </Link>
            {' '}
          </li>
        })}
      </ul>
    </div>
  );
}
