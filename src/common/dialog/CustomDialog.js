import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';

const CustomDialog = ({dialogOpen,setDialogOpen, title, body }) => {
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='md'
        scroll='body'
        onClose={() => setDialogOpen(!dialogOpen)}
        open={dialogOpen}
      >
        <DialogTitle>
          <h4>{title}</h4>
          {body}
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
