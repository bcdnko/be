import React  from 'react';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import { SidebarChapterSelector } from '../molecules/SidebarChapterSelector';
import { SimplePlaceholder } from '../../shared/atoms/SimplePlaceholder';
import { IBibleBooksByTestament, IBibleBook, IBibleChapterRef } from '../../../core/interfaces/Bible.interfaces';
import listStyles from '../molecules/SideList.module.scss';

type Props = {
  testament: IBibleBooksByTestament,
  chapterRef: IBibleChapterRef | null,
  book: IBibleBook | null,
}

export const BookSelectorListItem: React.FC<Props> = ({
  testament,
  chapterRef,
  book,
}) => {
  const { settings } = useSettingsContext();
  const { chapterUrl } = useBibleNavigate({ chapterRef });

  if (!book || !chapterRef) {
    return (<SimplePlaceholder xs={12} />);
  }

  return (
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
  );
}

