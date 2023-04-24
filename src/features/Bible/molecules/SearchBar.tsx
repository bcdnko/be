import { Orama, search } from '@orama/orama';
import { forwardRef, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Typeahead from 'react-bootstrap-typeahead/types/core/Typeahead';
import { useBibleNavigate } from '../hooks/useBibleNavigate';

// TODO
type Item = any;

type Props = {
  searchDb: Orama;
};

export const SearchBar = forwardRef<Typeahead, Props>(({ searchDb }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Item[]>([]);
  const { goTo } = useBibleNavigate({});

  const handleSearch = (query: string) => {
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

    goTo(versionId, bookId, chapter, no);
  };

  return (
    <AsyncTypeahead
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
