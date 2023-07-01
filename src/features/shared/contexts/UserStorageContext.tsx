import React, { useCallback } from 'react';
import { useUserStorage } from '../hooks/userStorage/useUserStorage';

const UserStorageContext = React.createContext<IDBDatabase | undefined>(
  undefined
);

export const UserStorageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const db = useUserStorage(
    // TODO redirect
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
