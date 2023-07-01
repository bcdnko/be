import { useState } from 'react';
import { StandardLayout } from '../../shared/templates/StandardLayout';
import { StrongCard } from '../../StrongDictionary/molecules/StrongCard';
import { Chapter } from '../organisms/Chapter';
import { SearchBar } from '../molecules/SearchBar';
import { MarksContextProvider } from '../../shared/contexts/MarksContext';
import { BibleContextProvider } from '../../shared/contexts/BibleChapterContext';
import { LeftSidebar } from '../organisms/LeftSidebar';
import { BibleSearchContextProvider } from '../../shared/contexts/BibleSearchContext';

export function BiblePage() {
  // TODO refactor
  const [strongId, setStrongId] = useState<string>();

  return (
    <BibleContextProvider>
      <BibleSearchContextProvider>
        <StandardLayout>
          {{
            leftSidebar: <LeftSidebar />,
            main: (
              <>
                <SearchBar />

                <MarksContextProvider>
                  <Chapter setStrongId={setStrongId} />
                </MarksContextProvider>
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
      </BibleSearchContextProvider>
    </BibleContextProvider>
  );
}
