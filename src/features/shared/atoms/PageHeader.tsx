import React  from 'react';

type Props = {
}

export const PageHeader: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (<h1 className="pageHeader">{children}</h1>);
}
