import * as React from 'react';
import { Button } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { DeleteOutlined } from '@ant-design/icons'

export default function DeletePopup({dataIndex, setDataSource}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (dataIndex) => {
    setDataSource(prev => {
      return prev.filter((td) => td.dataIndex !== dataIndex)
    })
    console.log(setDataSource);
  };
  const closeAndDelete = () => {
    handleDelete();
    handleClose();
  }

  return (
    <div>
      <DeleteOutlined variant="outlined" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete Category
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete category "{dataIndex}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={closeAndDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}