import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { SwitchSettingRow } from '../molecules/SwitchSettingRow';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';

export function BookSelectorSettings() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <div className="mt-4">
      <h4>Sidebar Book Selector</h4>

      <SwitchSettingRow
        label="Drop down chapter list (experimental)"
        icon={faListAlt}
        checked={settings.bookSelector.showChaptersDropDown}
        onChange={() =>
          updateSettings((settings) => {
            settings.bookSelector.showChaptersDropDown =
              !settings.bookSelector.showChaptersDropDown;
            return settings;
          })
        }
      />
    </div>
  );
}
