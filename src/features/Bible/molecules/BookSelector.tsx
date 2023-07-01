import React, { useMemo } from 'react';
import {
  IBibleBooksByTestament,
  IBibleBook,
} from '../../../core/interfaces/Bible.interfaces';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { BookSelectorListItem } from '../atoms/BookSelectorListItem';
import styles from './BookSelector.module.scss';
import listStyles from './SideList.module.scss';

function groupBooksByTestament(books?: IBibleBook[]): IBibleBooksByTestament[] {
  // TODO l18n
  const result: IBibleBooksByTestament[] = [
    {
      title: 'Old Testament',
      testament: 'old',
      books: books ? [] : Array(39).fill(undefined),
    },
    {
      title: 'New Testament',
      testament: 'new',
      books: books ? [] : Array(27).fill(undefined),
    },
  ];

  if (!books) {
    result[0].books = Array(39).fill(undefined);
    result[1].books = Array(27).fill(undefined);

    return result;
  }

  return books.reduce((acc, book) => {
    const testamentIndex = book.testament === 'new' ? 1 : 0;
    acc[testamentIndex].books.push(book);
    return acc;
  }, result);
}

type Props = {
  books?: IBibleBook[];
};

export function BookSelector({ books }: Props) {
  const { chapterContext } = useBibleContext();

  // TODO move to context
  const booksGrouped = useMemo(() => groupBooksByTestament(books), [books]);

  return (
    <section className={[listStyles.sideList, styles.bookSelector].join(' ')}>
      {booksGrouped.map((testament) => (
        <div
          className={styles.testament}
          key={`${testament.title}`}
        >
          <strong>{testament.title}</strong>

          <ul>
            {testament.books.map((book, i) => (
              <BookSelectorListItem
                key={
                  chapterContext
                    ? `${chapterContext?.version.id}_${book?.id}`
                    : i
                }
                testament={testament}
                book={book}
              />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
