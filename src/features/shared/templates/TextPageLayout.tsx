import React from 'react';
import { StandardLayout, StandardLayoutProps } from './StandardLayout';

import './TextPageLayout.scss';

export const TextPageLayout: React.FC<StandardLayoutProps> = ({
  children,
}) => {
  return (
    <StandardLayout>
      {{
        leftSidebar: children.leftSidebar,
        main: (
          <div className="textPageWrapper">
            {children.main}
          </div>
        ),
        rightSidebar: children.rightSidebar,
      }}
    </StandardLayout>
  );
}
