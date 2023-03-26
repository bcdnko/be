import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
  defaultSettings,
  useSettingsContext,
} from '../../../core/contexts/SettingsContext';
import { cloneDeepJson } from '../../../core/util/serialization';
import { GeneralSettings } from '../organisms/GeneralSettings';
import { ChapterSettings } from '../organisms/ChapterSettings';
import { BookSelectorSettings } from '../organisms/BookSelectorSettings';

type Props = {
  show: boolean;
  onHide: () => void;
};

export const SettingsModal: React.FC<Props> = ({ show, onHide }) => {
  const { setSettings } = useSettingsContext();

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>Settings</Modal.Header>

      <Modal.Body>
        <GeneralSettings />
        <ChapterSettings />
        <BookSelectorSettings />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() =>
            window.confirm('Are yo shure?') &&
            setSettings(cloneDeepJson(defaultSettings))
          }
        >
          Reset to defaults
        </Button>

        <Button
          variant="outline-secondary"
          onClick={onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
