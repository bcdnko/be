import React, { useMemo }  from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBooksByTestament, BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import { BibleNavigationService } from '../../../core/service/BibleNavigationService';
import { SidebarChapterSelector } from '../molecules/SidebarChapterSelector';
import { BookSelectorSkeleton } from './BookSelectorSkeleton';
import styles from './BookSelector.module.scss';
import listStyles from './SideList.module.scss';

type Props = {
  books?: BibleBookStored[],
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
  const booksGrouped = useMemo(() => groupBooksByTestament(books || []), [books]);
  const { settings } = useSettingsContext();

  if (!books) {
    return <BookSelectorSkeleton />;
  }

  return (
    <section className={[listStyles.sideList, styles.bookSelector].join(' ')}>
      {booksGrouped.map(testament => (
        <div
          className={styles.testament}
          key={`${testament.title}`}
        >
          <strong>{testament.title}</strong>

          <ul>
            {testament.books.map(book => (
              <li
                key={`${testament.title}_${book.id}`}
                className={[
                  'sideListItem',
                  bookId === book.id ? 'active ' + listStyles.active : null,
                ].join(' ')}
              >
                {settings.bookSelector.showChaptersDropDown && <SidebarChapterSelector
                  versionId={versionId}
                  book={book}
                  chapter={chapter}
                />}
                <Link to={BibleNavigationService.chapterUrl(versionId, book.id, 1)}>
                  {book.titleShort}
                </Link>

              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
