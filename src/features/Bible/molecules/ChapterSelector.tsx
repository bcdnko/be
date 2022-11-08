import React from 'react';
import { Link } from 'react-router-dom';
import { BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import { useBibleNavigate } from '../hooks/useBibleNavigate';

export type ChapterSelectorProps = {
  versionId: string,
  book: BibleBookStored,
  chapter: number,
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = (props) => {
  const { versionId, book } = props;
  const currentChapter = props.chapter;

  const { chapterUrl } = useBibleNavigate({
    versionId,
    book,
    chapter: currentChapter,
  });

  return (
    <div className="chapterList">
      {' '}
      <ul>
        {[...Array(book.chapters)].map((_, i) => {
          const chapter = i + 1;

          return <li
            className={[currentChapter === chapter ? 'active' : ''].join(' ')}
            key={`${book.id}_${chapter}`}
          >
            <Link to={chapterUrl(versionId, book.id, chapter)}>
              {chapter}
            </Link>
            {' '}
          </li>
        })}
      </ul>
    </div>
  );
}
