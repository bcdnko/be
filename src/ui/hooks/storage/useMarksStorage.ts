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
      console.log('load marks');
      storage.getChapterMarks(chapterRef).then(setMarks);
    }
  }, [storage, JSON.stringify(chapterRef)]);

  const addMark = async (...args: Parameters<MarksApi['addMark']>) => {
    return Promise.resolve()
      .then(() => storage.addMark(...args))
      .then(() => storage.getChapterMarks(chapterRef!))
      .then(setMarks);
  };

  const removeMark = (...args: Parameters<MarksApi['addMark']>) => {
    console.log(storage);
    return Promise.resolve()
      .then(() => storage.removeMark(...args))
      .then(() => storage.getChapterMarks(chapterRef!))
      .then(setMarks);
  };

  const setAllMarks = (...args: Parameters<MarksApi['setAllMarks']>) => {
    console.log('setAllMarks', chapterRef, args);
    return Promise.resolve()
      .then(() => storage.setAllMarks(...args))
      .then(() => storage.getChapterMarks(chapterRef!))
      .then(setMarks);
  };

  return { marks, addMark, removeMark, setAllMarks, storage };
}
