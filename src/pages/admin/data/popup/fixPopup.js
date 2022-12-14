import * as React from 'react';
import { Form, Radio, Button, Space, Switch, Table, Input } from 'antd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EditOutlined } from '@ant-design/icons';

export default function FixPopup({record}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditOutlined type="primary" variant="outlined" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fix Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label= {record.categories}
            dataIndex="category"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}