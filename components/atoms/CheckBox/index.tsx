import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Icon from '../Icon';
import IconPath from '../../../utils/Constants';

export interface StyledCheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>,checked: boolean) => void;
  indeterminate?: boolean;
  id?: string;
  className?: string;
}

const CheckBox: React.FC<StyledCheckboxProps> = ({
  checked = false,
  onChange,
  indeterminate = false,
  id,
  className,
}) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      indeterminate={indeterminate}
      icon={<Icon src={IconPath.UncheckedImg} />}
      checkedIcon={<Icon src={IconPath.CheckedImg} />}
      indeterminateIcon={<Icon src={IconPath.IndeterminateImg} />}
      id={id}
      className={className}
    />
  );
};

export default CheckBox;
