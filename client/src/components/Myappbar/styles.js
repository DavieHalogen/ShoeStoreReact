import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    height: 70,
  },
  heading: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
 
    },
  },
  
  
  userName: {
    marginInline: 10,
  },
  
  button: {
    marginInline: 10,
  },
  
  purple: {
    
    color: theme.palette.secondary.main,
    backgroundColor: deepPurple,
  },
}));
