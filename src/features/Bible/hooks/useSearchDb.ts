import { create, load, Orama, Stemmer, stemmers } from '@orama/orama';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchBibleSearchDb } from '../../../core/api/bible';
import { BibleVersionId } from '../../../core/interfaces/Bible.interfaces';
import { LanguageId } from '../../../core/interfaces/Language.interfaces';
import { bibleSearchDbSchema } from '../../../core/search/BibleSearch';
import { mapToSearchLanguage } from '../../../core/search/helpers';

function getStemmer(langId: string) {
  const map: { [key: string]: Stemmer } = {
    en: stemmers.english,
    ru: stemmers.russian,
  };

  return map[langId];
}

export function useSearchDb(
  versionId: BibleVersionId,
  langId?: LanguageId
): Orama | undefined {
  const [db, setDb] = useState<Orama | undefined>();

  const searchDbQuery = useQuery(
    [versionId],
    () => fetchBibleSearchDb(versionId),
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
