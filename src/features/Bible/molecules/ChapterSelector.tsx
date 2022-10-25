import React from 'react';
import { Link } from 'react-router-dom';
import { BibleBookStored } from '../../../core/interfaces/Bible.interfaces';

type Props = {
  versionId: string,
  book: BibleBookStored,
}

export const ChapterSelector: React.FC<Props> = ({
  versionId,
  book,
}) => {
  return (<ul className="chapterList">
    {[...Array(book.chapters)].map((_, i) => {
      const chapter = i + 1;

      return <li
        className="chapter"
        key={`${book.id}_${chapter}`}
      >
        <Link
          to={`/bible/${versionId}/${book.id}/${chapter}`}
          onClick={() => window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
          } as any)}
        >
          {chapter}
        </Link>
      </li>
    })}
  </ul>);
}
