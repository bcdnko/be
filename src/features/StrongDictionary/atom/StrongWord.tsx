import React  from 'react';

type Props = {
  strongId: string,
  onClick: () => void,
}

export const StrongWord: React.FC<Props> = ({
  strongId,
  onClick,
}) => {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer' }}>
      {' '}{strongId}
    </span>
  );
}
