import { useState } from 'react';
import { StandardLayout } from '../../core/templates/StandardLayout';
import { StrongCard } from '../../strong/molecules/StrongCard';
import { Chapter } from '../organisms/Chapter';
import { SearchBar } from '../molecules/SearchBar';
import { BibleContextProvider } from '../../../context/BibleChapterContext';
import { LeftSidebar } from '../organisms/LeftSidebar';
import { BibleSearchContextProvider } from '../../../context/BibleSearchContext';

export function BiblePage() {
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
                <Chapter setStrongId={setStrongId} />
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
