import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { config } from '../../../config';
import { fetchBibleBooks, fetchBibleVersions } from '../../../core/api/bible';
import { fetchVerses } from '../../../core/api/bible/verse';
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

type RouteParams = {
  versionId?: string;
  bookId?: string;
  chapter?: string;
};

export function BiblePage() {
  const params = useParams<RouteParams>();
  const { settings } = useSettingsContext();

  const selectedVerses = getSelectedVersesFromHash(window.location.hash);

  const versionId: BibleVersionId =
    params.versionId ||
    settings.general.defaultBibleVersionId ||
    config.defaultVersionId;
  const bookId: BibleBookId = (params.bookId && parseInt(params.bookId)) || 1;
  const chapter: BibleChapterId =
    (params.chapter && parseInt(params.chapter)) || 1;

  const versionsQuery = useQuery('versions', fetchBibleVersions);
  const [strongId, setStrongId] = useState<string | null>(null);

  const booksQuery = useQuery(['books', versionId], () =>
    fetchBibleBooks(versionId)
  );

  const versesQuery = useQuery(['verses', versionId, bookId, chapter], () =>
    fetchVerses(versionId, bookId, chapter)
  );

  const isError =
    versionsQuery.isError || booksQuery.isError || versesQuery.isError;
  if (isError) {
    throw [versionsQuery.error, booksQuery.error, versesQuery.error].filter(
      (e) => e !== null
    );
  }

  const versions = versionsQuery.data || null;
  const books = booksQuery.data || null;
  const verses = versesQuery.data || null;

  const version = versionsQuery.data
    ? versionsQuery.data.find((v) => v.id === versionId)
    : null;
  const book = booksQuery.data
    ? booksQuery.data.find((b) => b.id === bookId) || null
    : null;

  const chapterRef: IBibleChapterRef | null = useMemo(() => {
    return version && book && chapter ? { version, book, chapter } : null;
  }, [version, book, chapter]);

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
            <Chapter
              chapterRef={chapterRef}
              verses={verses}
              selectedVerses={selectedVerses}
              setStrongId={setStrongId}
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

  //return <div>Something went wrong</div>;
}
