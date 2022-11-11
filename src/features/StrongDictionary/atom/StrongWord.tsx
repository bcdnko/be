import React  from 'react';
import styles from './StrongWord.module.scss';

type Props = {
  strongId: string,
  onClick: () => void,
}

export const StrongWord: React.FC<Props> = ({
  strongId,
  onClick,
}) => {
  return (
    <>
      {' '}
      <span className={styles.word} onClick={onClick}>
        {strongId}
      </span>
    </>
  );
}
