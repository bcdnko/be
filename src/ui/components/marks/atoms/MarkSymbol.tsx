import {
  faCircleQuestion,
  faHeart,
  faStar,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VerseMarkSymbol } from '../../../services/marks/marks-api.interfaces';

function getIcon(symbol: VerseMarkSymbol, state: boolean) {
  const lightColor = 'LightGray';

  switch (symbol) {
    case VerseMarkSymbol.SYMBOL_EXCLAMATION:
      return (
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          color={state ? 'crimson' : lightColor}
        />
      );

    case VerseMarkSymbol.SYMBOL_QUESTION:
      return (
        <FontAwesomeIcon
          icon={faCircleQuestion}
          color={state ? 'dodgerblue' : lightColor}
        />
      );

    case VerseMarkSymbol.SYMBOL_HEART:
      return (
        <FontAwesomeIcon
          icon={faHeart}
          color={state ? 'crimson' : lightColor}
        />
      );

    case VerseMarkSymbol.SYMBOL_STAR:
      return (
        <FontAwesomeIcon
          icon={faStar}
          color={state ? 'orange' : lightColor}
        />
      );
  }
}

interface Props {
  markId: VerseMarkSymbol;
  state: boolean;
  toggle: (markId: VerseMarkSymbol, currentSate: boolean) => void;
}

export function MarkSymbol({ markId, state, toggle }: Props) {
  return (
    <button
      className="btn btn-sm"
      type="button"
      onClick={(e) => {
        toggle(markId, state);
        e.stopPropagation();
      }}
    >
      {getIcon(markId, state)}
    </button>
  );
}
