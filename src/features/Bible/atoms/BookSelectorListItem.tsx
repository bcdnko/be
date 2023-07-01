import React from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { chapterUrl } from '../hooks/useBibleNavigate';
import { SidebarChapterSelector } from '../molecules/SidebarChapterSelector';
import { SimplePlaceholder } from '../../shared/atoms/SimplePlaceholder';
import {
  IBibleBooksByTestament,
  IBibleBook,
} from '../../../core/interfaces/Bible.interfaces';
import listStyles from '../molecules/SideList.module.scss';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';

type Props = {
  testament: IBibleBooksByTestament;
  book?: IBibleBook;
};

export function BookSelectorListItem({ testament, book }: Props) {
  const { settings } = useSettingsContext();
  const { chapterContext } = useBibleContext();

  if (!book || !chapterContext) {
    return <SimplePlaceholder xs={12} />;
  }

  return (
    <li
      key={`${testament.title}_${book.id}`}
      className={[
        'sideListItem',
        chapterContext.book.id === book.id
          ? 'active ' + listStyles.active
          : undefined,
      ].join(' ')}
    >
      {settings.bookSelector.showChaptersDropDown && (
        /* TODO check renders */
        <SidebarChapterSelector chapterContext={{ ...chapterContext, book }} />
      )}

      <Link
        to={chapterUrl({
          versionId: chapterContext.version.id,
          bookId: book.id,
          chapter: 1,
        })}
      >
        {book.titleShort}
      </Link>
    </li>
  );
}
