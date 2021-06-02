import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckboxMaterial from '@material-ui/core/Checkbox';

const CheckBox = ({label, value, name, handleChange}) => {
  return (
    <FormControlLabel
      control={
        <CheckboxMaterial
        checked={value}
        onChange={handleChange}
        name={name}
        inputProps={{'aria-label': 'secondary checkbox'}}
      />}
      label={label}
    />
  );
};

export default CheckBox;