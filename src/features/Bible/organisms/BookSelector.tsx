import React, { useMemo }  from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBooksByTestament, BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import { ChapterSelector } from '../molecules/ChapterSelector';
import './VersionSelector.scss';

type Props = {
  books: BibleBookStored[],
  versionId: string,
  bookId: number,
}

function groupBooksByTestament(books: BibleBookStored[]): BibleBooksByTestament {
  const result = [
    { title: 'Old Testament', books: [] as BibleBookStored[]},
    { title: 'New Testament', books: [] as BibleBookStored[]},
  ];

  return books.reduce((acc, book) => {
    const testamentIndex = book.testament === 'new' ? 1 : 0;
    acc[testamentIndex].books.push(book);
    return acc;
  }, result);
}

export const BookSelector: React.FC<Props> = ({
  books,
  versionId,
  bookId,
}) => {
  const booksGrouped = useMemo(() => groupBooksByTestament(books), [books]);
  const { settings } = useSettingsContext();

  return (<section className='nonDecoratedLinks'>
    <div className="row">
      {booksGrouped.map(testament => (
        <div
          className="col-md-12 col-lg-6"
          key={`${testament.title}`}
        >
          <strong>{testament.title}</strong>

          <ul className="sideList">
            {testament.books.map(book => (
              <li
                key={`${testament.title}_${book.id}`}
                className={[
                  'sideListItem',
                  bookId === book.id ? 'active' : null,
                ].join(' ')}
              >
                <Link to={`/bible/${versionId}/${book.id}`}>
                  {book.titleShort}
                </Link>

                {settings.bookSelector.showChaptersDropDown && <ChapterSelector
                  versionId={versionId}
                  book={book}
                />}
              </li>
            ))}
          </ul>
        </div>
    ))}
    </div>
  </section>);
}
