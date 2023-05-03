import React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandFist,
  faGear,
  faRectangleXmark,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { SettingsModal } from '../../Settings/pages/SettingsModal';
import {
  IBibleChapterRef,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import styles from './ChapterToolbar.module.scss';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';

type Props = {
  chapterRef?: IBibleChapterRef;
  verses?: IBibleVerse[];
  selectedVerses: IVerseRange;
  copySelectedVerses: () => void;
};

export const ChapterToolbar: React.FC<Props> = ({
  chapterRef,
  verses,
  selectedVerses,
  copySelectedVerses,
}) => {
  const { settings, updateSettings } = useSettingsContext();
  const { changeActiveVerse } = useBibleNavigate({ chapterRef });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
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
          onClick={() =>
            updateSettings((settings) => {
              settings.chapter.showStrong = !settings.chapter.showStrong;
              return settings;
            })
          }
        >
          <FontAwesomeIcon icon={faHandFist} />
        </ToggleButton>{' '}
        <>
          <ButtonGroup>
            <Button
              title="Copy Selected Verses (y)"
              disabled={!(chapterRef && verses && selectedVerses.length)}
              variant="primary"
              onClick={() => copySelectedVerses()}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>

            <Button
              title="Share Selected Verses"
              disabled={!(chapterRef && verses && selectedVerses.length)}
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FontAwesomeIcon icon={faShare} />
            </Button>

            <Button
              title="Unselect Verses (esc)"
              disabled={!(verses && selectedVerses.length)}
              variant="primary"
              onClick={() => changeActiveVerse()}
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </Button>
          </ButtonGroup>{' '}
        </>
        <Button
          title="Settings"
          onClick={() => setShowSettingsModal(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
      </div>
    </>
  );
};
