import { useQuery } from 'react-query';
import { fetchBibleBooks, fetchBibleVersions } from '../../../core/api/bible';
import { fetchVerses } from '../../../core/api/bible/verse';
import {
  BibleBookId,
  BibleChapterId,
  BibleVersionId,
} from '../../../core/interfaces/Bible.interfaces';

type Props = {
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: BibleChapterId;
};

export function useBibleContextLoader({ versionId, bookId, chapter }: Props) {
  const versionsQuery = useQuery('versions', fetchBibleVersions);
  const version = versionsQuery.data?.find((v) => v.id === versionId);

  const booksQuery = useQuery(['books', versionId], () =>
    fetchBibleBooks(versionId)
  );

  const book = booksQuery.data?.find((b) => b.id === bookId);

  const versesQuery = useQuery(['verses', versionId, bookId, chapter], () =>
    fetchVerses(versionId, bookId, chapter)
  );

  return {
    versions: versionsQuery.data,
    books: booksQuery.data,
    version,
    book,
    verses: versesQuery.data,
  };
}
