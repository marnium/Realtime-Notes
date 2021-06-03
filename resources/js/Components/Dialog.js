import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({handleClose, onDelete, open}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Eliminar la(s) nota(s)?</DialogTitle>
        <DialogActions>
          <Button onClick={() => {handleClose(); onDelete()}} color="primary">
            Eliminar
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;