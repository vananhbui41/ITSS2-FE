import * as React from 'react';
import { Form, Radio, Button, Space, Switch, Table, Input } from 'antd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';


export default function AddPopup({ addCategory }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeAndAdd = () => {
    console.log(setNewdata);
    onInputChange();
    handleClose();
  }
  const [newdata, setNewdata] = useState({
    name: "",
  });
  const onInputChange = (e) => {
    setNewdata({...newdata, [e.target.name]: e.target.value});
    setNewdata('');
  };
  const {name} = newdata;
  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(name);
}
  
  return (
    <div>
      <Button type="primary" variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField onSubmit={handleSubmit}
            autoFocus
            // margin="dense"
            // id="name"
            // dataIndex="category"
            value={name}
            onChange={ (e) => onInputChange(e)}
            label="Add New Category"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={closeAndAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}