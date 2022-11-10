import React, { useMemo }  from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { BibleBooksByTestament, IBibleBookStored, IBibleChapterRef } from '../../../core/interfaces/Bible.interfaces';
import { SidebarChapterSelector } from '../molecules/SidebarChapterSelector';
import { BookSelectorSkeleton } from './BookSelectorSkeleton';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import styles from './BookSelector.module.scss';
import listStyles from './SideList.module.scss';

type Props = {
  chapterRef: IBibleChapterRef | null,
  books: IBibleBookStored[] | null,
}

function groupBooksByTestament(books: IBibleBookStored[]): BibleBooksByTestament {
  const result = [
    { title: 'Old Testament', books: [] as IBibleBookStored[]},
    { title: 'New Testament', books: [] as IBibleBookStored[]},
  ];

  return books.reduce((acc, book) => {
    const testamentIndex = book.testament === 'new' ? 1 : 0;
    acc[testamentIndex].books.push(book);
    return acc;
  }, result);
}

export const BookSelector: React.FC<Props> = ({
  books,
  chapterRef,
}) => {
  const booksGrouped = useMemo(() => groupBooksByTestament(books || []), [books]);
  const { settings } = useSettingsContext();
  const { chapterUrl } = useBibleNavigate({ chapterRef });

  if (!books || !chapterRef) {
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
                  chapterRef.book.id === book.id ? 'active ' + listStyles.active : null,
                ].join(' ')}
              >
                {settings.bookSelector.showChaptersDropDown && <SidebarChapterSelector
                  chapterRef={chapterRef}
                />}
                <Link to={chapterUrl(chapterRef.version.id, book.id, 1)}>
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
