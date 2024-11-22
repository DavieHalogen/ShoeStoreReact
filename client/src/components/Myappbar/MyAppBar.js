import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import {Typography, Button, Avatar} from '@mui/material';
import logo from '../../utils/main-logo-transparent.png'
import useStyles from './styles'

const MyAppBar = () => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  
  const isHomepage = location.pathname === '/';
  const buttonLabel = isHomepage ? 'Login' : 'Home';
  const targetRoute = isHomepage ? '/login' : '/';
  
  const handleNavigate = () => {
     navigate(targetRoute)
  }
  
  const logOut = React.useCallback(() => {
    localStorage.clear()
    navigate('/')
    setUser(null)
  }, [navigate]);
  
  const tokenExpiry = React.useCallback(() => {
    const token = user?.token
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < new Date().getTime())
          logOut();
     }
      setUser(JSON.parse(localStorage.getItem('profile')));
  }, [logOut, user?.token])
  
  React.useEffect( () => {
    tokenExpiry();
  }, [location, tokenExpiry])
  
  
  return (
    <nav className={classes.appBar} >
  
       
        <img className={classes.image} src={logo} alt={logo} height="120"  />
        <Typography className={classes.heading} variant="h5"  component="div" sx={{ flexGrow: 1 }}>
          Shoe Store
        </Typography>
       
        
        {user?.user ? (
         <>
            <Avatar className={classes.purple} alt={user?.user.username} src={user?.user.imageUrl}>{user?.user.username.charAt(0)}</Avatar>
          <div className={classes.userName}>
            <Typography  variant="h6">{user?.user.username}</Typography>
          </div>
          <div className={classes.button}>
            <Button variant="contained"  color="secondary" onClick={logOut}>Logout</Button>
          </div>
          </>
          ) : (
          <div className={classes.button}>
            <Button color='secondary' variant='contained' onClick={handleNavigate}  className={classes.button} >
                {buttonLabel}
            </Button>
          </div>
            )
        }
        
    </nav>
  );
};

export default MyAppBar;
