import { ChapterSelector } from './ChapterSelector';
import { PagetopChapterSelectorSkeleton } from './PagetopChapterSelectorSkeleton';
import { IBibleChapterRef } from '../../../core/interfaces/Bible.interfaces';
import './PagetopChapterSelector.scss';

type PagetopChapterSelectorProps = {
  chapterRef: IBibleChapterRef | null,
}

export const PagetopChapterSelector: React.FC<PagetopChapterSelectorProps> =
  ({ chapterRef }) => {
    return chapterRef
      ? <ChapterSelector chapterRef={chapterRef} />
      : <PagetopChapterSelectorSkeleton />;
  };
