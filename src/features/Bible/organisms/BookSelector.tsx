import React, { useMemo }  from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBooksByTestament, BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import { SidebarChapterSelector } from '../molecules/SidebarChapterSelector';
import styles from './SideList.module.scss';

type Props = {
  books: BibleBookStored[],
  versionId: string,
  bookId: number,
  chapter: number,
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
  chapter,
}) => {
  const booksGrouped = useMemo(() => groupBooksByTestament(books), [books]);
  const { settings } = useSettingsContext();

  return (<section className={styles.sideList}>
    <div className="row">
      {booksGrouped.map(testament => (
        <div
          className="col-md-12 col-lg-6"
          key={`${testament.title}`}
        >
          <strong>{testament.title}</strong>

          <ul className={styles.sideList}>
            {testament.books.map(book => (
              <li
                key={`${testament.title}_${book.id}`}
                className={[
                  'sideListItem',
                  styles.sideListItem,
                  bookId === book.id ? 'active ' + styles.active : null,
                ].join(' ')}
              >
                {settings.bookSelector.showChaptersDropDown && <SidebarChapterSelector
                  versionId={versionId}
                  book={book}
                  chapter={chapter}
                />}
                <Link to={`/bible/${versionId}/${book.id}`}>
                  {book.titleShort}
                </Link>

              </li>
            ))}
          </ul>
        </div>
    ))}
    </div>
  </section>);
}
