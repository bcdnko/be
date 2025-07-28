import React, { useMemo } from 'react';
import { MarksApi } from '../services/marks/marks-api.interfaces';
import { MarksApiLocalStorage } from '../services/marks/storage/local-storage.service';

const MarksStorageContext = React.createContext<MarksApi>(undefined!);

export const MarksStorageProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const storage = useMemo(() => {
    return new MarksApiLocalStorage();
  }, []);

  return (
    <MarksStorageContext.Provider value={storage}>
      {children}
    </MarksStorageContext.Provider>
  );
};

export function useMarksStorageContext() {
  const context = React.useContext(MarksStorageContext);

  if (!context) {
    throw new Error(
      'useMarksStorageContext must be used within a MarksStorageProvider'
    );
  }

  return context;
}
