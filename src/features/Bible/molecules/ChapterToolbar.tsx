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
import { useBibleNavigate } from '../hooks/useBibleNavigate';
import styles from './ChapterToolbar.module.scss';
import { useSettingsContext } from '../../shared/contexts/SettingsContext';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';
import { useVerseSelectionActions } from '../../shared/actions/useVerseSelectionActions';

type Props = {};

export function ChapterToolbar({ }: Props) {
  const { settings, updateSettings } = useSettingsContext();
  const { chapterContext, verses } = useBibleContext();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { copySelectedVersesAction } = useVerseSelectionActions();
  const { changeActiveVerse } = useBibleNavigate();

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
}
