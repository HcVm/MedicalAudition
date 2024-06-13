import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ children, ...rest }) {
  return (
    <MuiButton {...rest}>
      {children}
    </MuiButton>
  );
}

export default Button;
