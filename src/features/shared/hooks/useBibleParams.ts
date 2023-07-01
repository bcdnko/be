import { useParams } from 'react-router-dom';
import { config } from '../../../config';
import {
  BibleBookId,
  BibleChapterId,
  BibleVersionId,
} from '../../../core/interfaces/Bible.interfaces';
import { useSettingsContext } from '../contexts/SettingsContext';

type RouteParams = {
  versionId?: string;
  bookId?: string;
  chapter?: string;
};

export function useBibleRouteParams() {
  // TODO useMemo
  const params = useParams<RouteParams>();
  const { settings } = useSettingsContext();

  const versionId: BibleVersionId =
    params.versionId ||
    settings.general.defaultBibleVersionId ||
    config.defaultVersionId;

  const bookId: BibleBookId = (params.bookId && parseInt(params.bookId)) || 1;

  const chapter: BibleChapterId =
    (params.chapter && parseInt(params.chapter)) || 1;

  return {
    versionId,
    bookId,
    chapter,
  };
}
