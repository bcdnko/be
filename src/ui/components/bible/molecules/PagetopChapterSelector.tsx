import { ChapterSelector } from './ChapterSelector';
import { SimplePlaceholder } from '../../core/atoms/SimplePlaceholder';
import './PagetopChapterSelector.scss';
import { useBibleContext } from '../../../context/BibleChapterContext';

function Skeleton() {
  return (
    <div className="chapterList">
      <SimplePlaceholder xs={12} />
    </div>
  );
}

export const PagetopChapterSelector: React.FC = () => {
  const { chapterContext } = useBibleContext();

  return chapterContext ? (
    <ChapterSelector chapterContext={chapterContext} />
  ) : (
    <Skeleton />
  );
};
