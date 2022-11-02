import React  from 'react';
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandFist, faGear, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from "../../../core/contexts/SettingsContext";
import { useState } from "react";
import { SettingsModal } from "../../Settings/pages/SettingsModal";
import { useNavigate } from 'react-router-dom';

type Props = {
  hasVerseSelection: boolean,
}

export const ChapterToolbar: React.FC<Props> = ({
  hasVerseSelection,
}) => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettingsContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return <>
    <SettingsModal
      show={showSettingsModal}
      onHide={() => setShowSettingsModal(false)}
    />

    <div style={{position: 'sticky', top: '0.5rem'}}>
      <ButtonGroup>
        <ToggleButton
          type="checkbox"
          checked={settings.chapter.showStrong}
          value="1"
          title="Enable/Disable Strong Numbers"
          onClick={() => updateSettings(settings => {
            settings.chapter.showStrong = !settings.chapter.showStrong;
            return settings;
          })}
        >
          <FontAwesomeIcon icon={faHandFist} />
        </ToggleButton>

        {hasVerseSelection &&
          <Button
            title="Unselect Verses"
            variant='danger'
            onClick={() => navigate('#', { preventScrollReset: true })}
          >
            <FontAwesomeIcon icon={faRectangleXmark} />
          </Button>
        }

        <Button
          title="Settings"
          onClick={() => setShowSettingsModal(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
      </ButtonGroup>
    </div>
  </>
}
