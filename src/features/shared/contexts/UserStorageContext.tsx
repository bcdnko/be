import React, { useCallback } from 'react';
import { UserStorage } from '../hooks/userStorage/idb/schema';
import { useUserStorage } from '../hooks/userStorage/idb/useUserStorage';

const UserStorageContext = React.createContext<UserStorage | undefined>(
  undefined
);

export const UserStorageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: any) => {
  // TODO redirect
  const db = useUserStorage(
    useCallback(() => alert('Unable to save changes'), [])
  );

  return (
    <UserStorageContext.Provider value={db}>
      {children}
    </UserStorageContext.Provider>
  );
};

export function useUserStorageContext() {
  return React.useContext(UserStorageContext);
}
