import { openDB } from 'idb';
import { useEffect, useState } from 'react';
import { config } from '../../../../../config';
import { UserStorage } from './schema';

function upgradeDb(db: UserStorage): void {
  if (!db.objectStoreNames.contains('bible-marks')) {
    const store = db.createObjectStore('bible-marks', {
      keyPath: 'id',
      autoIncrement: true,
    });

    store.createIndex('typeValue', ['type', 'value']);
    store.createIndex('chapterRef', ['bookId', 'chapter']);
    store.createIndex('verseRef', ['bookId', 'chapter', 'verseNum']);
  }
}

async function initDb(): Promise<UserStorage> {
  const db = await openDB('be-user', config.userStorageVersion, {
    upgrade: upgradeDb,

    blocked: () => {
      alert(
        'Your data storage version upgrade is blocked by another BibleExplorer instance running in some other tab. Please close all the BibleExplorer tabs in your browser and reload this page'
      );
    },

    blocking: () => {
      db.close();

      // TODO redirect
      alert(
        'Your data storage version is outdated. We disconnected this tab from to let another tab upgrade it. Please reload the page to continue using the app'
      );
    },
  });

  return db;
}

export function useUserStorage(
  onError: EventListenerOrEventListenerObject
): UserStorage | undefined {
  const [storage, setStorage] = useState<UserStorage>();

  useEffect(() => {
    const initStorage = async () => {
      const db = await initDb();
      db.addEventListener('error', onError);
      setStorage(db);
    };

    initStorage();

    return function cleanUp() {
      storage?.close();
      storage?.removeEventListener('error', onError);
    };
  }, [onError]);

  return storage;
}
