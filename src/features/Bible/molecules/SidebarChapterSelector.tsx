import { ChapterSelector, ChapterSelectorProps } from './ChapterSelector';
import './SidebarChapterSelector.scss';

export function SidebarChapterSelector({ ...props }: ChapterSelectorProps) {
  return <ChapterSelector {...props} />;
}
