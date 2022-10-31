import { ChapterSelector } from './ChapterSelector';
import { PagetopChapterSelectorSkeleton } from './PagetopChapterSelectorSkeleton';
import { BibleBookStored } from '../../../core/interfaces/Bible.interfaces';
import './PagetopChapterSelector.scss';

type PagetopChapterSelectorProps = {
  versionId: string,
  book?: BibleBookStored,
  chapter: number,
}

export const PagetopChapterSelector: React.FC<PagetopChapterSelectorProps> =
  ({
    versionId,
    book,
    chapter,
  }) => {
    if (book) {
      return <ChapterSelector
        versionId={versionId}
        book={book}
        chapter={chapter}
      />
    }

    return <PagetopChapterSelectorSkeleton />
  };
