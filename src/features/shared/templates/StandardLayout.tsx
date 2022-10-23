import React, { PropsWithChildren } from 'react';
import { StandardFooter } from "../organisms/StandardFooter";
import { StandardHeader } from "../organisms/StandardHeader"

import styles from './StandardLayout.module.scss';

type Props = {
}

export const StandardLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (<div>
    <StandardHeader />

    <main className={styles.pageBg}>
      {children}
    </main>

    <StandardFooter />
  </div>);
}
