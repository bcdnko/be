import { Orama, search } from '@orama/orama';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Typeahead from 'react-bootstrap-typeahead/types/core/Typeahead';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { useBibleSearchContext } from '../../shared/contexts/BibleSearchContext';
import { useBibleNavigate } from '../hooks/useBibleNavigate';

// TODO
type Item = any;

type Props = {};

export const SearchBar = forwardRef<Typeahead, Props>(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Item[]>([]);
  const { navigateBible } = useBibleNavigate();
  const { isSearchFocused, searchDb } = useBibleSearchContext();
  const { chapterContext } = useBibleContext();

  const ref = useRef<Typeahead>(null);

  useEffect(() => {
    if (isSearchFocused && ref.current) {
      ref.current.focus();
    }
  }, [isSearchFocused]);

  const handleSearch = (query: string) => {
    if (!searchDb) {
      return;
    }

    setIsLoading(true);

    search(searchDb, {
      term: query,
      relevance: {
        k: 0.1,
        // b: 2,
        // d: 0,
      },
      offset: 0,
      limit: 10,
    }).then((result) => {
      const items = result.hits.map((hit) => hit.document);
      setOptions(items);
      setIsLoading(false);
    });
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const onChange = (result: any[]) => {
    if (!result[0]) {
      return;
    }

    const { versionId, bookId, chapter, no } = result[0];

    navigateBible({ versionId, bookId, chapter, verse: no });
  };

  // TODO !!!! the key prop does not work here properly

  return (
    <AsyncTypeahead
      key={chapterContext?.version.id}
      filterBy={filterBy}
      id="bible-search"
      ref={ref}
      paginate={true}
      isLoading={isLoading}
      labelKey="text"
      minLength={3}
      onSearch={handleSearch}
      onChange={onChange}
      options={options}
      placeholder="Search"
      renderMenuItemChildren={(opt: Item) => (
        <>
          <span>
            <strong>{opt.ref}:</strong> {opt.text}
          </span>
        </>
      )}
    />
  );
});
