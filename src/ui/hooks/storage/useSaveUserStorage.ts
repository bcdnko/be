import { z } from 'zod';
import { SettingsSchema } from '../../../core/interfaces/common.interfaces';
import { useBibleContext } from '../../context/BibleChapterContext';
import { useMarksStorageContext } from '../../context/MarksStorageContext';
import { useSettingsContext } from '../../context/SettingsContext';
import { AllMarksSchema } from '../../services/marks/marks-api.interfaces';
import { useMarksStorage } from './useMarksStorage';

const UserDataFileSchema = z.object({
  settings: SettingsSchema,
  marks: AllMarksSchema,
});

export function useUserStorage({
  marks,
}: {
  marks: ReturnType<typeof useMarksStorage>;
}) {
  const { settings, setSettings } = useSettingsContext();

  const exportUserStorage = async () => {
    const userData = {
      settings: settings,
      marks: await marks.storage.getAllMarks(),
    };

    const json = JSON.stringify(userData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-bible-exporer-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importUserStorage = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    document.body.appendChild(fileInput);

    try {
      fileInput.click();
      fileInput.addEventListener('change', () => {
        if (!fileInput.files || !fileInput.files[0]) return;
        const file = fileInput.files[0];

        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result;
          if (content === undefined || content === null) return;

          const userData = UserDataFileSchema.parse(
            JSON.parse(content.toString())
          );

          setSettings(userData.settings);
          marks.setAllMarks(userData.marks);
        };
        reader.readAsText(file);
      });
    } finally {
      document.body.removeChild(fileInput);
    }
  };

  return {
    exportUserStorage,
    importUserStorage,
  };
}
