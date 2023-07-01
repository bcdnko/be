import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { BookSelector } from '../molecules/BookSelector';
import { VersionSelector } from '../molecules/VersionSelector';

export function LeftSidebar() {
  const { versions, books } = useBibleContext();

  return (
    <div>
      <VersionSelector versions={versions} />
      <BookSelector books={books} />
    </div>
  );
}
