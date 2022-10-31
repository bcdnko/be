import React  from 'react';

type Props = {
}

export const PageSubHeader: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (<h2>{children}</h2>);
}
