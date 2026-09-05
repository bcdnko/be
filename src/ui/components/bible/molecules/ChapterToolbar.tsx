import React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandFist,
  faGear,
  faRectangleXmark,
  faShare,
  faFileUpload,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { SettingsModal } from '../../settings/pages/SettingsModal';
import { useBibleNavigate } from '../../../hooks/actions/bible/useBibleNavigate';
import styles from './ChapterToolbar.module.scss';
import { useSettingsContext } from '../../../context/SettingsContext';
import { useBibleContext } from '../../../context/BibleChapterContext';
import { useVerseSelectionActions } from '../../../hooks/actions/bible/useVerseSelectionActions';
import { useUserStorage } from '../../../hooks/storage/useSaveUserStorage';
import { useMarksStorage } from '../../../hooks/storage/useMarksStorage';

type Props = {
  marks: ReturnType<typeof useMarksStorage>;
};

export function ChapterToolbar({ marks }: Props) {
  const { settings, updateSettings } = useSettingsContext();
  const { chapterContext, verses } = useBibleContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { copySelectedVersesAction } = useVerseSelectionActions();
  const { changeActiveVerse } = useBibleNavigate();
  const { exportUserStorage, importUserStorage } = useUserStorage({ marks });

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
              disabled={
                !(
                  chapterContext &&
                  verses &&
                  chapterContext.selectedVerses.length
                )
              }
              variant="primary"
              onClick={() => copySelectedVersesAction()}
            >
              <FontAwesomeIcon icon={faCopy} />
            </Button>

            <Button
              title="Share Selected Verses"
              disabled={
                !(
                  chapterContext &&
                  verses &&
                  chapterContext.selectedVerses.length
                )
              }
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <FontAwesomeIcon icon={faShare} />
            </Button>

            <Button
              title="Unselect Verses (esc)"
              disabled={
                !(
                  chapterContext &&
                  verses &&
                  chapterContext.selectedVerses.length
                )
              }
              variant="primary"
              onClick={() => changeActiveVerse()}
            >
              <FontAwesomeIcon icon={faRectangleXmark} />
            </Button>
          </ButtonGroup>{' '}
        </>{' '}
        <ButtonGroup>
          <Button
            title="Export your data"
            onClick={() => exportUserStorage()}
          >
            <FontAwesomeIcon icon={faFileDownload} />
          </Button>
          <Button
            title="Import your data"
            onClick={() => importUserStorage()}
          >
            <FontAwesomeIcon icon={faFileUpload} />
          </Button>
        </ButtonGroup>{' '}
        <Button
          title="Settings"
          onClick={() => setShowSettingsModal(true)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Button>
      </div>
    </>
  );
}
