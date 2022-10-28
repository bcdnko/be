import React  from 'react';
import { FormCheck } from 'react-bootstrap';

type Props = {
  label: string,
  checked: boolean,
  onChange: () => void,
}

export const SwitchSettingRow: React.FC<Props> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="row">
      <div className="col-8 col-sm-10 align-middle">{label}</div>
      <div className="col-4 col-sm-2 text-right" style={{padding: '2px 0'}}>
        <FormCheck
          type="switch"
          checked={checked}
          onChange={onChange}
          style={{transform: 'scale(1.5)'}}
        />
      </div>
    </div>
  );
}

