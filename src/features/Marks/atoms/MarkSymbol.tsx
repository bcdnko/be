import { VerseMarkValue } from '../../shared/hooks/userStorage/types/marks';

interface Props {
  symbol: string;
  state: boolean;
  toggle: (value: VerseMarkValue, currentSate: boolean) => void;
}

export function MarkSymbol({ symbol, state, toggle }: Props) {
  return (
    <button
      style={{
        color: state ? 'black' : 'silver',
      }}
      onClick={() => toggle(symbol, state)}
    >
      {symbol}
    </button>
  );
}
