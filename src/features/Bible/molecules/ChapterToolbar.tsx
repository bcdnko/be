import React  from 'react';
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandFist, faGear, faRectangleXmark, faShare } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useSettingsContext } from "../../../core/contexts/SettingsContext";
import { useState } from "react";
import { SettingsModal } from "../../Settings/pages/SettingsModal";
import { useNavigate } from 'react-router-dom';
import { BibleBookStored, IVerseSelection } from '../../../core/interfaces/Bible.interfaces';
import styles from './ChapterToolbar.module.scss';

type Props = {
  selectedVerses: IVerseSelection,
  book?: BibleBookStored,
  copySelectedVerses: () => void,
}

export const ChapterToolbar: React.FC<Props> = ({
  selectedVerses,
  book,
  copySelectedVerses,
}) => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettingsContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return <>
    <SettingsModal
      show={showSettingsModal}
      onHide={() => setShowSettingsModal(false)}
    />

    <div className={styles.toolbar}>
        <ToggleButton
          type="checkbox"
          checked={settings.chapter.showStrong}
          value="1"
          title="Enable/Disable Strong Numbers (s)"
          onClick={() => updateSettings(settings => {
            settings.chapter.showStrong = !settings.chapter.showStrong;
            return settings;
          })}
        >
          <FontAwesomeIcon icon={faHandFist} />
        </ToggleButton>
        {' '}

        <>
          <ButtonGroup>
            <Button
              title="Copy Selected Verses (y)"
              disabled={!(selectedVerses.length && book)}
              variant="primary"
              onClick={() => copySelectedVerses()}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>

            <Button
              title="Share Selected Verses"
              disabled={!(selectedVerses.length && book)}
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FontAwesomeIcon icon={faShare} />
            </Button>

            <Button
              title="Unselect Verses (esc)"
              disabled={!(selectedVerses.length && book)}
              variant="primary"
              onClick={() => navigate('#', { preventScrollReset: true })}
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </Button>
          </ButtonGroup>
        {' '}
        </>

        <Button
          title="Settings"
          onClick={() => setShowSettingsModal(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
    </div>
  </>
}
