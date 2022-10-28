import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { SwitchSettingRow } from '../molecules/SwitchSettingRow';

export function ChapterSettings() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <div className="mt-4">
      <h4>Chapter View</h4>

      <SwitchSettingRow
        label="Show verse numbers"
        checked={settings.chapter.showVerseNumber}
        onChange={() => updateSettings(settings => {
          settings.chapter.showVerseNumber = !settings.chapter.showVerseNumber;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Split verses"
        checked={settings.chapter.splitVerses}
        onChange={() => updateSettings(settings => {
          settings.chapter.splitVerses = !settings.chapter.splitVerses;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Show chapter list above and below the text"
        checked={settings.chapter.showChapterList}
        onChange={() => updateSettings(settings => {
          settings.chapter.showChapterList = !settings.chapter.showChapterList;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Full book names in text"
        checked={settings.chapter.fullBookHeader}
        onChange={() => updateSettings(settings => {
          settings.chapter.fullBookHeader = !settings.chapter.fullBookHeader;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Show Strong's numbers"
        checked={settings.chapter.showStrong}
        onChange={() => updateSettings(settings => {
          settings.chapter.showStrong = !settings.chapter.showStrong;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Highlight the words of Jesus"
        checked={settings.chapter.highlightJesusWords}
        onChange={() => updateSettings(settings => {
          settings.chapter.highlightJesusWords = !settings.chapter.highlightJesusWords;
          return settings;
        })}
      />

      <SwitchSettingRow
        label="Huge previous/next chapter buttons around the text"
        checked={settings.chapter.hugePrevNextChapterBtns}
        onChange={() => updateSettings(settings => {
          settings.chapter.hugePrevNextChapterBtns = !settings.chapter.hugePrevNextChapterBtns;
          return settings;
        })}
      />
    </div>
  );
}
