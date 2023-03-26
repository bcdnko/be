import { ChapterSelector } from './ChapterSelector';
import { IBibleChapterRef } from '../../../core/interfaces/Bible.interfaces';
import { SimplePlaceholder } from '../../shared/atoms/SimplePlaceholder';
import './PagetopChapterSelector.scss';

type PagetopChapterSelectorProps = {
  chapterRef: IBibleChapterRef | null;
};

function Skeleton() {
  return (
    <div className="chapterList">
      <SimplePlaceholder xs={12} />
    </div>
  );
}

export const PagetopChapterSelector: React.FC<PagetopChapterSelectorProps> = ({
  chapterRef,
}) => {
  return chapterRef ? (
    <ChapterSelector chapterRef={chapterRef} />
  ) : (
    <Skeleton />
  );
};
