import React from 'react';
import { Modal as MuiModal, Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Modal = ({ open, onClose, title, children, maxWidth = 'sm' }) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: maxWidth === 'sm' ? 600 : maxWidth === 'md' ? 900 : 1200,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 1,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2" id="modal-title">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;