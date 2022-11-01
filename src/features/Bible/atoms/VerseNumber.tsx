import React  from 'react';

type Props = {
  no: number,
}

export const VerseNumber: React.FC<Props> = ({
  no,
}) => {
  return (
    <>
      <span>{no}.</span>
      &nbsp;
    </>
  );
}
