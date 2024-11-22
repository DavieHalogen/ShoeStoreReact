import React from 'react';
import {Container, Box, Grid, Typography, Button, Alert} from '@mui/material';

import {createAdmin} from '../../api/apiService';
import UserTable from './userTable/UserTable';
import Input from '../Auth/Input';
import useStyles from './styles';

const UserManagement = () => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState({ username: '', phoneNumber: '', email: '', password: '' });
  
  const [formError, setFormError] = React.useState('');
  const success = 'Admin created successfully';
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 10000);
  };
  
  const handleShowForm = () => setShowForm(!showForm);
  
  const updatingUsers = () => {
    console.log('Updating users.');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('')
    try {
      let response;
       response = await createAdmin(formData);
       if (response && response.success) {
        handleSuccess();
        updatingUsers();
        setShowForm(false);
      }
    } catch (error) {
      setFormError(error.message || 'Something went wrong.');
    }
  };
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  return(
  <Container  >
    <Box className={classes.paper} elevation={6} >
    <Button onClick={handleShowForm} color='secondary' variant={showForm ? 'outlined' : 'contained'}  >
     <Typography variant='h5' >Create Admin</Typography>
    </Button>
    {showSuccess && <><br/><Alert variant='outlined' severity='success' >{success}</Alert></>}
    { showForm &&
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input name="username" label="User Name" handleChange={handleChange} autoFocus />
          <Input name="phoneNumber" label="Phone Number" handleChange={handleChange}/>
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          </Grid>
           <br />
          {formError && <Typography color="error">{formError}</Typography>}
          <br/>
          <Button type="submit"  fullWidth variant="contained" color="primary" className={classes.submit}>
            Create Admin
          </Button>
      </form>
    }
    </Box>
       <UserTable userUpdate={updatingUsers} />
  </Container>
)};
export default UserManagement;