import { useEffect, useState } from 'react';
import { config } from '../../../../../config';

export function promisifyIdbRequest<T>(
  requestFn: () => IDBRequest<T>
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const request = requestFn();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function upgradeDb(db: IDBDatabase): void {
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

async function initDb(): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const request = indexedDB.open('be-user', config.userStorageVersion);

    request.onsuccess = () => {
      const db = request.result;

      db.onversionchange = () => {
        db.close();

        // TODO redirect
        reject(
          'Your data storage version is outdated. We disconnected this tab from to let another tab upgrade it. Please reload the page to continue using the app'
        );
      };
      resolve(request.result);
    };

    request.onupgradeneeded = () => upgradeDb(request.result);

    request.onblocked = () => {
      reject(
        'Your data storage version upgrade is blocked by another BibleExplorer instance running in some other tab. Please close all the BibleExplorer tabs in your browser and reload this page'
      );
    };
  });
}

export function useIdbUserStorage(
  onError: EventListenerOrEventListenerObject
): IDBDatabase | undefined {
  const [storage, setStorage] = useState<IDBDatabase>();

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
