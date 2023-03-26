import { ChapterSelector, ChapterSelectorProps } from './ChapterSelector';
import './SidebarChapterSelector.scss';

export const SidebarChapterSelector: React.FC<ChapterSelectorProps> = ({
  ...props
}) => {
  return <ChapterSelector {...props} />;
};
