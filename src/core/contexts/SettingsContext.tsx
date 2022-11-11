import React from 'react';
import { config } from '../../config';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ISettings } from '../interfaces/common.interfaces';
import { cloneDeepJson } from '../util/serialization';

export const defaultSettings: ISettings = {
  version: 1,
  general: {
    showGoToTopButton: true,

    defaultBibleVersionId: config.defaultVersionId,
    defaultDictionaryId: config.defaultDictionaryId,
  },
  chapter: {
    showVerseNumber: true,
    showChapterList: true,

    fullBookHeader: true,
    showStrong: false,
    highlightJesusWords: true,
    hugePrevNextChapterBtns: true,

    vimKeys: false,
  },
  bookSelector: {
    showChaptersDropDown: false,
  },
};

interface ISettingsContext {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
  updateSettings: (setter: (current: ISettings) => ISettings) => void;
}

const SettingsContext = React.createContext({} as ISettingsContext);

export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [settings, setSettings] = useLocalStorage<ISettings>('settings', cloneDeepJson(defaultSettings));

  function updateSettings(
    setter: (prevValue: ISettings) => ISettings,
  ) {
    setSettings((prevSettings: ISettings) => setter(cloneDeepJson(prevSettings)));
  }

  return (<SettingsContext.Provider value={{
    settings,
    setSettings,
    updateSettings,
  }}>
    {children}
  </SettingsContext.Provider>);
}

export function useSettingsContext() {
  return React.useContext(SettingsContext);
}

