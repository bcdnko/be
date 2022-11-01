import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { fetchBibleBooks, fetchBibleVersions } from '../../../core/api/bible';
import { fetchVerses } from '../../../core/api/bible/verse';
import { StandardLayout } from '../../shared/templates/StandardLayout';
import { BookSelector } from '../organisms/BookSelector';
import { Chapter } from '../organisms/Chapter';
import { VersionSelector } from '../organisms/VersionSelector';

type RouteParams = {
  versionId?: string,
  bookId?: string,
  chapter?: string,
};

function getSelectedVersesFromHash(hashString: string): [number, number] {
  const hash = hashString.slice(1);
  const verseNo = parseInt(hash);

  if (!hash.length || !verseNo) {
    return [0,0];
  }

  return [verseNo, verseNo];
}

export function BiblePage() {
  const params = useParams<RouteParams>();
  const selectedVerses = getSelectedVersesFromHash(useLocation().hash);

  const versionId = params.versionId || 'kjv';
  const bookId = (params.bookId && parseInt(params.bookId)) || 1;
  const chapter = (params.chapter && parseInt(params.chapter)) || 1;

  const versionsQuery = useQuery('versions', fetchBibleVersions);

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

  const books = booksQuery.data;
  const versions = versionsQuery.data;
  const verses = versesQuery.data;

  const book = books && books.length ? books.find(b => b.id === bookId) : undefined;
  return (
    <StandardLayout>
      {{
        leftSidebar: (
          <div>
            <VersionSelector
              versions={versions}
              versionId={versionId}
              bookId={bookId}
              chapter={chapter}
            />

            <BookSelector
              books={books}
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
              verses={verses}
              selectedVerses={selectedVerses}
            />
          </>
        ),
        //rightSidebar: (),
      }}
    </StandardLayout>
  );

  //return <div>Something went wrong</div>;
}
