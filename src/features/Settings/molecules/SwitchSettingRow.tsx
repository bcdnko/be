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
      <div className="col-8 col-sm-10">{label}</div>
      <div className="col-4 col-sm-2 text-right">
        <FormCheck
          type="switch"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

