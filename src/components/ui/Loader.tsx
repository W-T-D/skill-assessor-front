import React, {useState} from 'react';
import { Alert, Box, CircularProgress, Modal } from '@mui/material';
import {
  alertBoxStyle,
  loaderBoxStyle
} from '../styles/Loader.styles';

interface ILoaderProps {
  children: React.ReactElement | React.ReactElement[] | string;
  isLoading: boolean;
  error?: string;
}

const Loader: React.FC<ILoaderProps> = ({ error, isLoading, children }) => {
  const [open, setOpen] = useState(false);
  const handleClose = (): void => {
    setOpen(false);
  };

  if (error !== null && error !== undefined) {
    setOpen(true);
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={alertBoxStyle}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Box sx={loaderBoxStyle}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default Loader;
