import { useIdbUserStorage } from './idb/useIdbUserStorage';

// TODO move to context
export function useUserStorage(onError: EventListenerOrEventListenerObject) {
  return useIdbUserStorage(onError);
}
