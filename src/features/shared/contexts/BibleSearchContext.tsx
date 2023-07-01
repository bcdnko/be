import { Orama } from '@orama/orama';
import React, { createContext, useState, useRef, useContext } from 'react';
import { useSearchDb } from '../../Bible/hooks/useSearchDb';

export interface IBibleSearchContext {
  isSearchFocused: boolean;
  focusSearch: () => void;
  blurSearch: () => void;
  searchDb?: Orama;
}

const BibleSearchContext = createContext<IBibleSearchContext>({
  isSearchFocused: false,
  focusSearch: () => { },
  blurSearch: () => { },
  searchDb: undefined,
});

export function BibleSearchContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchDb = useSearchDb();

  const focusSearchInput = () => {
    setIsSearchFocused(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const blurSearchInput = () => {
    setIsSearchFocused(false);
  };

  return (
    <BibleSearchContext.Provider
      value={{
        isSearchFocused,
        focusSearch: focusSearchInput,
        blurSearch: blurSearchInput,
        searchDb,
      }}
    >
      {children}
    </BibleSearchContext.Provider>
  );
}

export function useBibleSearchContext() {
  return useContext(BibleSearchContext);
}
