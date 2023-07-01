import React, { MouseEventHandler } from 'react';
import styles from './StrongWord.module.scss';

type Props = {
  strongId: string;
  onClick: MouseEventHandler | undefined;
};

export const StrongWord: React.FC<Props> = ({ strongId, onClick }) => {
  return (
    <>
      {' '}
      <span
        className={`${styles.word} link-primary`}
        onClick={onClick}
      >
        {strongId}
      </span>
    </>
  );
};
