import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MyAppBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === '/';
  const buttonLabel = isHomePage ? 'Login' : 'Home';
  const targetRoute = isHomePage ? '/login' : '/';
  
  function handleButtonClick() {
    navigate(targetRoute)
  }
  
  return (
    <AppBar position="static" color="primary" sx={{
      height: 70,
      
    }} >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shoe Store
        </Typography>
        <Button 
            color="inherit"
            onClick={handleButtonClick}
        > 
           {buttonLabel}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
