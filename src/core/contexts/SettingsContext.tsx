import React from 'react';
import { ISettings } from '../interfaces/common.interfaces';
import { cloneDeepJson } from '../util/serialization';

const defaultSettings: ISettings = {
  version: 1,
  general: {
    showGoToTopButton: true,
  },
  chapter: {
    showVerseNumber: true,
    splitVerses: true,
    showChapterList: true,

    fullBookHeader: true,
    showStrong: false,
    highlightJesusWords: true,
    hugePrevNextChapterBtns: true,
  },
  bookSelector: {
    showChaptersDropDown: true,
  },
};

interface ISettingsContext {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

const SettingsContext = React.createContext({} as ISettingsContext);

export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [settings, setSettings] = React.useState(cloneDeepJson(defaultSettings));

  return (<SettingsContext.Provider value={{
    settings,
    setSettings,
  }}>
    {children}
  </SettingsContext.Provider>);
}

export function useSettingsContext() {
  return React.useContext(SettingsContext);
}

