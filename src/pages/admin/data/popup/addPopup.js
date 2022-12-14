import * as React from 'react';
import { Form, Radio, Button, Space, Switch, Table, Input } from 'antd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AddPopup({tableColumns}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const {setColumns} = useContext(CategoriesData);
  const [column, setColumn] = useState('');
  // const onInputChange = (e) => {
  //   setNewEmployee({...newEmployee,[e.target.name]: e.target.value})
  // }
  // const {name, email, phone, address} = newEmployee;
  const handleSubmit = () => {
    tableColumns(prev => [...prev, column])
    setColumn('')
  }
  
  return (
    <div>
      <Button type="primary" variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            // autoFocus
            // margin="dense"
            // id="name"
            // dataIndex="category"
            value={column}
            onChange={e => setColumn(e.target.value)}
            label="Add New Category"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleClose} onSubmit={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}