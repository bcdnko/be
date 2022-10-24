import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getBibleBooks, getBibleVersions } from '../../../core/api/bible';
import { BibleBookStored, BibleVersionStored } from '../../../core/interfaces/Bible.interfaces';
import { StandardLayout } from '../../shared/templates/StandardLayout';
import { BookSelector } from '../organisms/BookSelector';
import { VersionSelector } from '../organisms/VersionSelector';

type RouteParams = {
  versionId?: string,
  bookId?: string,
  chapter?: string,
};

export function BiblePage() {
  console.log('render')
  const initRef = useRef(false);

  const params = useParams<RouteParams>();
  const versionId = params.versionId || 'kjv';
  const bookId = params.bookId && parseInt(params.bookId) || 1;
  const chapter = params.chapter && parseInt(params.chapter) || 1;
  console.log(versionId, bookId, chapter)

  const [isLoading, setLoading] = useState<boolean>(true);

  const [versions, setVersions] = useState<BibleVersionStored[]>([]);
  const [books, setBooks] = useState<BibleBookStored[]>([]);

  const version = !versionId
    ? null
    : versions.find(ver => ver.id === versionId);

  if (!isLoading && !version) {
    // TODO handle
    console.error('Version wasn\'t found', versionId, version, versions);
  }

  // Initial loading
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    Promise.all([
      getBibleVersions(),
      getBibleBooks(versionId)
    ]).then(([versions, books]) => {
      setVersions(versions);
      setBooks(books);
      setLoading(false);
    });
  }, []);

  // Reload books on version change
  useEffect(() => {
    if (versionId && !isLoading) {
      setLoading(true)
      getBibleBooks(versionId).then(books => {
        setBooks(books);
        setLoading(false);
      });
    }
  }, [versionId]);

  return (<StandardLayout>
    {{
      leftSidebar: (
        <>
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
          />
        </>
      ),
      main: (
        <>
        </>
      ),
      //rightSidebar: (),
    }}
  </StandardLayout>);
}
