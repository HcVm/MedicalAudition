import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

function Input({ label, ...rest }) {
  return (
    <MuiTextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...rest}
    />
  );
}

export default Input;
