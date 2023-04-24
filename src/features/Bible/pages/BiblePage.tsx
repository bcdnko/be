import { createRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../../../config';
import {
  BibleBookId,
  BibleChapterId,
  BibleVersionId,
  IBibleChapterRef,
} from '../../../core/interfaces/Bible.interfaces';
import { getSelectedVersesFromHash } from '../../../core/service/VerseHighlightService';
import { StandardLayout } from '../../shared/templates/StandardLayout';
import { StrongCard } from '../../StrongDictionary/molecules/StrongCard';
import { BookSelector } from '../molecules/BookSelector';
import { Chapter } from '../organisms/Chapter';
import { VersionSelector } from '../molecules/VersionSelector';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { useBibleContextLoader } from '../hooks/useBibleContextLoader';
import { useSearchDb } from '../hooks/useSearchDb';
import { SearchBar } from '../molecules/SearchBar';
import Typeahead from 'react-bootstrap-typeahead/types/core/Typeahead';

type RouteParams = {
  versionId?: string;
  bookId?: string;
  chapter?: string;
};

export function BiblePage() {
  const params = useParams<RouteParams>();
  const searchRef = createRef<Typeahead>();
  const focusSearch = () => searchRef.current?.focus();

  const { settings } = useSettingsContext();
  const [strongId, setStrongId] = useState<string>();

  const selectedVerses = getSelectedVersesFromHash(window.location.hash);

  const versionId: BibleVersionId =
    params.versionId ||
    settings.general.defaultBibleVersionId ||
    config.defaultVersionId;

  const bookId: BibleBookId = (params.bookId && parseInt(params.bookId)) || 1;

  const chapter: BibleChapterId =
    (params.chapter && parseInt(params.chapter)) || 1;

  const { versions, books, version, book, verses } = useBibleContextLoader({
    versionId,
    bookId,
    chapter,
  });

  const chapterRef: IBibleChapterRef | undefined =
    version && book && chapter ? { version, book, chapter } : undefined;

  const searchDb = useSearchDb(versionId, version?.langId);

  return (
    <StandardLayout>
      {{
        leftSidebar: (
          <div>
            <VersionSelector
              currentVersionId={versionId}
              currentBookId={bookId}
              currentChapter={chapter}
              versions={versions}
              chapterRef={chapterRef}
            />

            <BookSelector
              books={books}
              chapterRef={chapterRef}
            />
          </div>
        ),
        main: (
          <>
            {searchDb && (
              <SearchBar
                key={versionId}
                searchDb={searchDb}
                ref={searchRef}
              />
            )}

            <Chapter
              chapterRef={chapterRef}
              verses={verses}
              selectedVerses={selectedVerses}
              setStrongId={setStrongId}
              focusSearch={focusSearch}
            />
          </>
        ),
        rightSidebar: (
          <>
            {strongId && (
              <StrongCard
                strongId={strongId}
                setStrongId={setStrongId}
              />
            )}
          </>
        ),
      }}
    </StandardLayout>
  );
}
