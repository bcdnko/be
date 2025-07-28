import { useEffect, useState } from 'react';
import { ChapterRef } from '../../../core/interfaces/Bible.interfaces';
import { useMarksStorageContext } from '../../context/MarksStorageContext';
import {
  ChapterMarks,
  MarksApi,
} from '../../services/marks/marks-api.interfaces';

export function useMarksStorage(chapterRef?: ChapterRef) {
  const [marks, setMarks] = useState<ChapterMarks>({});
  const storage = useMarksStorageContext();

  useEffect(() => {
    if (chapterRef) {
      storage.getChapterMarks(chapterRef).then(setMarks);
    }
  }, [storage, JSON.stringify(chapterRef)]);

  const addMark = (...args: Parameters<MarksApi['addMark']>) => {
    storage.addMark(...args);
    storage.getChapterMarks(chapterRef!).then(setMarks);
  };

  const removeMark = (...args: Parameters<MarksApi['addMark']>) => {
    storage.removeMark(...args);
    storage.getChapterMarks(chapterRef!).then(setMarks);
  };

  return { marks, addMark, removeMark };
}
