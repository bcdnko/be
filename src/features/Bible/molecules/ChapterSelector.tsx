import React from 'react';
import { Link } from 'react-router-dom';
import { BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import { BibleNavigationService } from '../../../core/service/BibleNavigationService';

export type ChapterSelectorProps = {
  versionId: string,
  book: BibleBookStored,
  chapter: number,
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = (props) => {
  const { versionId, book } = props;
  const currentChapter = props.chapter;

  return (
    <div className="chapterList">
      <span>Chapters:</span>
      {' '}
      <ul>
        {[...Array(book.chapters)].map((_, i) => {
          const chapter = i + 1;

          return <li
            className={[currentChapter === chapter ? 'active' : ''].join(' ')}
            key={`${book.id}_${chapter}`}
          >
            <Link to={BibleNavigationService.chapterUrl(versionId, book.id, chapter)}>
              {chapter}
            </Link>
            {' '}
          </li>
        })}
      </ul>
    </div>
  );
}
