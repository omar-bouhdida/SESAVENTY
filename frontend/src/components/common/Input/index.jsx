import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ error, helperText, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error || helperText}
      {...props}
    />
  );
};

export default Input;