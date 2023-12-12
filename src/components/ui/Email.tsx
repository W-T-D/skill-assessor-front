import React from 'react';
import { TextField } from '@mui/material';
import { type ControllerRenderProps, type FieldErrors } from 'react-hook-form';
import type User from '../../models/user/User';

interface IEmailProps {
  field: ControllerRenderProps<User, 'email'>;
  errors: FieldErrors<User>;
}

const Email: React.FC<IEmailProps> = ({ field, errors }) => {
  return (
    <TextField
      {...field}
      variant="outlined"
      label="Email"
      margin="normal"
      size="small"
      error={!(errors.email === null || errors.email === undefined)}
      helperText={errors.email?.message}
      sx={{
        width: '70%'
      }}
    />
  );
};

export default Email;
