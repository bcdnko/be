import React  from 'react';
import { Placeholder as BootstrapPlaceholder, PlaceholderProps } from 'react-bootstrap';

export const SimplePlaceholder: React.FC<PlaceholderProps> = ({
  animation,
  xs,
}) => {
  return (
    <BootstrapPlaceholder animation={animation || 'glow'}>
      <BootstrapPlaceholder xs={xs}></BootstrapPlaceholder>
    </BootstrapPlaceholder>
  );
}
