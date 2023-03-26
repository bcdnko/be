import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { SwitchSettingRow } from '../molecules/SwitchSettingRow';

export function GeneralSettings() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <div>
      <h4>General</h4>

      <SwitchSettingRow
        label="Show Go to the top button"
        icon={faArrowUp}
        checked={settings.general.showGoToTopButton}
        onChange={() =>
          updateSettings((settings) => {
            settings.general.showGoToTopButton =
              !settings.general.showGoToTopButton;
            return settings;
          })
        }
      />
    </div>
  );
}
