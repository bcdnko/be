import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { SwitchSettingRow } from '../molecules/SwitchSettingRow';

export function BookSelectorSettings() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <div>
      <h4>Sidebar Book Selector Settings</h4>

      <SwitchSettingRow
        label="Drop down chapter list"
        checked={settings.bookSelector.showChaptersDropDown}
        onChange={() => updateSettings(settings => {
          settings.bookSelector.showChaptersDropDown = !settings.bookSelector.showChaptersDropDown;
          return settings;
        })}
      />
    </div>
  );
}
