import React, { PropsWithChildren, ReactNode } from 'react';
import { StandardFooter } from "../organisms/StandardFooter";
import { StandardHeader } from "../organisms/StandardHeader"

import styles from './StandardLayout.module.scss';

type Props = {
  children: {
    main: ReactNode,
    leftSidebar?: ReactNode,
    rightSidebar?: ReactNode,
  },

}

export const StandardLayout: React.FC<Props> = ({
  children,
}) => {
  return (<div>
    <StandardHeader />

    <aside className="col-12 col-md-3 order-2 order-md-1">
      {children.leftSidebar}
    </aside>

    <main className={styles.pageBg}>
      {children.main}
    </main>

    <aside className="col-12 col-md-3 order-3">
      {children.rightSidebar}
    </aside>

    <StandardFooter />
  </div>);
}
