import { ChapterSelector, ChapterSelectorProps } from './ChapterSelector';
import './PagetopChapterSelector.scss';

export const PagetopChapterSelector: React.FC<ChapterSelectorProps> = ({...props}) => {
  return <ChapterSelector {...props} />
};
