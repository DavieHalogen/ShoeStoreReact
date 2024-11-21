import React from 'react';
import {Container, Box, Grid, Typography, Button} from '@mui/material';

import {createAdmin} from '../../api/apiService';
import Input from '../Auth/Input';
import useStyles from './styles';

const UserManagement = () => {
  const classes = useStyles();
  
  const [formData, setFormData] = React.useState({ username: '', phoneNumber: '', email: '', password: '' });
  
  const [formError, setFormError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
       response = await createAdmin(formData);
       if (response && response.success) {
        setSuccess('Admin created successfully');
      }
    } catch (error) {
      setFormError(error.message || 'Something went wrong.');
    }
  };
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  return(
  <Container  >
    <Box className={classes.paper} elevation={6} >
     <Typography variant='h5' >Create Admin</Typography>
     
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input name="username" label="User Name" handleChange={handleChange} autoFocus />
          <Input name="phoneNumber" label="Phone Number" handleChange={handleChange}/>
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          </Grid>
           <br />
          {formError && <Typography color="error">{formError}</Typography>}
          {success && <Typography color="blue">{success}</Typography>}
          <br/>
          <Button type="submit"  fullWidth variant="contained" color="primary" className={classes.submit}>
            Create Admin
          </Button>
      </form>
    </Box>
    
  </Container>
)};
export default UserManagement;