import React  from 'react';

type Props = {
  no: number,
}

export const VerseNumber: React.FC<Props> = ({
  no,
}) => {
  return (
    <>
      <span id={'v-' + no}>{no}.</span>
      &nbsp;
    </>
  );
}
