import { SwitchSettingRow } from '../molecules/SwitchSettingRow';
import {
  faListOl,
  faSquare,
  faHandFist,
  faComment,
  faArrowsLeftRight,
  faA,
  faV,
} from '@fortawesome/free-solid-svg-icons';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';

export function ChapterSettings() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <div className="mt-4">
      <h4>Chapter View</h4>

      <SwitchSettingRow
        label="Show verse numbers"
        icon={faListOl}
        checked={settings.chapter.showVerseNumber}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.showVerseNumber =
              !settings.chapter.showVerseNumber;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Show chapter list above and below the text"
        icon={faSquare}
        checked={settings.chapter.showChapterList}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.showChapterList =
              !settings.chapter.showChapterList;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Full book names in text"
        icon={faA}
        checked={settings.chapter.fullBookHeader}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.fullBookHeader = !settings.chapter.fullBookHeader;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Show Strong's numbers"
        icon={faHandFist}
        checked={settings.chapter.showStrong}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.showStrong = !settings.chapter.showStrong;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Highlight the words of Jesus"
        icon={faComment}
        checked={settings.chapter.highlightJesusWords}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.highlightJesusWords =
              !settings.chapter.highlightJesusWords;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Prev/Next chapter buttons"
        icon={faArrowsLeftRight}
        checked={settings.chapter.hugePrevNextChapterBtns}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.hugePrevNextChapterBtns =
              !settings.chapter.hugePrevNextChapterBtns;
            return settings;
          })
        }
      />

      <SwitchSettingRow
        label="Enable Vim keys"
        icon={faV}
        checked={settings.chapter.vimKeys}
        onChange={() =>
          updateSettings((settings) => {
            settings.chapter.vimKeys = !settings.chapter.vimKeys;
            return settings;
          })
        }
      />
    </div>
  );
}
