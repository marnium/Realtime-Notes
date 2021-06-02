import React from 'react';
import ButtonMaterial from '@material-ui/core/Button';

const Button = ({type = 'submit', processing, children}) => {
  return (
    <ButtonMaterial
      type={type}
      variant="contained"
      color="primary"
      disabled={processing}
    >{children}</ButtonMaterial>
  );
}

export default Button;