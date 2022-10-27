import React, { ReactNode } from 'react';
import { useSettingsContext } from '../../../core/contexts/SettingsContext';
import { GoToTop } from '../organisms/GoToTop';
import { StandardFooter } from "../organisms/StandardFooter";
import { StandardHeader } from "../organisms/StandardHeader"

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

  return (<div>
    <StandardHeader />

    <div className="row">
      <aside className="col-12 col-md-3 order-2 order-md-1">
        {children.leftSidebar}
      </aside>

      <main className="g-0 col-12 col-sm-12 col-md-6 order-1 order-md-2">
        {children.main}
      </main>

      <aside className="col-12 col-md-3 order-3">
        {children.rightSidebar}
      </aside>

      <StandardFooter />

      {settings.general.showGoToTopButton && <GoToTop />}
    </div>
  </div>);
}
