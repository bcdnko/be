import React, { ReactNode } from 'react';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { GoToTop } from '../molecules/GoToTop';
import { StandardFooter } from '../organisms/StandardFooter';
import { StandardHeader } from '../organisms/StandardHeader'

import './StandardLayout.scss';

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
  const { settings } = useSettingsContext();

  return (<div className="be-container">
    <StandardHeader />

    <aside className="leftSidebar">
      {children.leftSidebar}
    </aside>

    <main>
      {children.main}
      {settings.general.showGoToTopButton && <GoToTop />}
    </main>

    <aside className="rightSidebar">
      {children.rightSidebar}
    </aside>

    <StandardFooter />
  </div>);
}
