import { create, load, Orama, Stemmer, stemmers } from '@orama/orama';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { bibleSearchDbSchema } from '../../../core/search/BibleSearch';
import { mapToSearchLanguage } from '../../../core/search/helpers';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { fetchBibleSearchDb } from '../../shared/hooks/data/api/loaders/fetchSearchDb';

function getStemmer(langId: string) {
  const map: { [key: string]: Stemmer } = {
    en: stemmers.english,
    ru: stemmers.russian,
  };

  return map[langId];
}

export function useSearchDb(): Orama | undefined {
  const [db, setDb] = useState<Orama | undefined>();
  const { chapterContext } = useBibleContext();
  const versionId = chapterContext?.version.id;
  const langId = chapterContext?.version.langId;

  const searchDbQuery = useQuery(
    [versionId],
    () => {
      if (!versionId) {
        return;
      }

      return fetchBibleSearchDb(versionId);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    async function loadDb() {
      if (!searchDbQuery.data || !langId) {
        return undefined;
      }

      const language = mapToSearchLanguage(langId);

      const db = await create({
        schema: bibleSearchDbSchema,
        components: {
          tokenizer: {
            stemmer: getStemmer(langId),
            language,
          },
        },
      });

      await load(db, searchDbQuery.data);

      setDb(db);
    }

    loadDb();
  }, [searchDbQuery.data, langId]);

  return db;
}
