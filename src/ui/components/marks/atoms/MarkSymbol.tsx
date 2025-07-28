import {
  MarkMap,
  VerseMarkSymbol,
} from '../../../services/marks/marks-api.interfaces';

interface Props {
  markId: VerseMarkSymbol;
  state: boolean;
  toggle: (markId: VerseMarkSymbol, currentSate: boolean) => void;
}

export function MarkSymbol({ markId, state, toggle }: Props) {
  return (
    <button
      style={{
        color: state ? 'black' : 'silver',
      }}
      onClick={(e) => {
        toggle(markId, state);
        e.stopPropagation();
      }}
    >
      {MarkMap.get(markId)?.value}
    </button>
  );
}
