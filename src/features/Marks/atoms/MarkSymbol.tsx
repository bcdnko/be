interface Props {
  symbol: string;
  state: boolean;
  toggle: () => void;
}

export function MarkSymbol({ symbol, state, toggle }: Props) {
  return (
    <button
      style={{
        color: state ? 'black' : 'silver',
      }}
      onClick={toggle}
    >
      {symbol}
    </button>
  );
}
