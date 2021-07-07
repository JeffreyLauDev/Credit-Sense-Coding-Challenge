import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useMessage} from 'src/context/MessageBoxContext';
const MessageBox = () => {
  const [message, setMessage] = useMessage();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={!!message}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            Close
          </Button>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default MessageBox;