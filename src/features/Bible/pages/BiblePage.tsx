import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchBibleBooks, fetchBibleVersions } from '../../../core/api/bible';
import { fetchVerses } from '../../../core/api/bible/verse';
import { getSelectedVersesFromHash } from '../../../core/service/VerseHighlightService';
import { StandardLayout } from '../../shared/templates/StandardLayout';
import { StrongCard } from '../../StrongDictionary/organisms/StrongCard';
import { BookSelector } from '../organisms/BookSelector';
import { Chapter } from '../organisms/Chapter';
import { VersionSelector } from '../organisms/VersionSelector';

type RouteParams = {
  versionId?: string,
  bookId?: string,
  chapter?: string,
};

export function BiblePage() {
  const params = useParams<RouteParams>();
  const selectedVerses = getSelectedVersesFromHash(window.location.hash);

  const versionId = params.versionId || 'kjv';
  const bookId = (params.bookId && parseInt(params.bookId)) || 1;
  const chapter = (params.chapter && parseInt(params.chapter)) || 1;

  const versionsQuery = useQuery('versions', fetchBibleVersions);
  const [strongId, setStrongId] = useState<string | null>(null);

  const booksQuery = useQuery(
    ['books', versionId],
    () => fetchBibleBooks(versionId)
  );

  const versesQuery = useQuery(
    ['verses', versionId, bookId, chapter],
    () => fetchVerses(versionId, bookId, chapter)
  );

  const isError = versionsQuery.isError || booksQuery.isError || versesQuery.isError;
  if (isError) {
    throw [versionsQuery.error, booksQuery.error, versesQuery.error].filter(e => e !== null);
  }

  const book = (booksQuery.data && booksQuery.data.length)
    ? booksQuery.data.find(b => b.id === bookId)
    : undefined;

  return (
    <StandardLayout>
      {{
        leftSidebar: (
          <div>
            <VersionSelector
              versions={versionsQuery.data}
              versionId={versionId}
              bookId={bookId}
              chapter={chapter}
            />

            <BookSelector
              books={booksQuery.data}
              versionId={versionId}
              bookId={bookId}
              chapter={chapter}
            />
          </div>
        ),
        main: (
          <>
            <Chapter
              versionId={versionId}
              book={book}
              chapter={chapter}
              verses={versesQuery.data}
              selectedVerses={selectedVerses}
              setStrongId={setStrongId}
            />
          </>
        ),
        rightSidebar: (
          <>
            {strongId && <StrongCard strongId={strongId} />}
          </>
        ),
      }}
    </StandardLayout>
  );

  //return <div>Something went wrong</div>;
}
