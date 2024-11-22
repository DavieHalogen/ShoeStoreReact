import React from "react";
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Typography, Checkbox, Button, Box, CircularProgress } from '@mui/material';

import useStyles from './styles';
import { fetchUsers } from '../../../api/apiService';

const UserTable = ({userUpdate}) => {
  const classes = useStyles();
  
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  const loadUsers = async () => {
    try {
      const {data} = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setError(true)
    } finally {setIsLoading(false)};
  };
  
  React.useEffect(() => {
   loadUsers()  
  } ,[userUpdate]);
  
  const toggleUserStatus = () => {
    
  };
  
  const editUser = () => {
    
  };
  
  const deleteUser = () => {
    
  };
  
  if (isLoading) return <CircularProgress align='center'sx={{marginTop: '10px'}} />
  if (error) return <Typography color='error'>Error fetching users:{error}</Typography>
  
  return (
    <Box className={classes.table}>
    <Typography variant="h6" align="center" sx={{ margin: 2, marginTop: '20px' }}>Users</Typography>
    <TableContainer  sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" style={{ color: 'red' }}>
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber || 'N/A'}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.registrationDate
                    ? new Date(user.registrationDate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={user.status === 'active'}
                    onChange={(e) => toggleUserStatus(user.id, e.target.checked)}
                    color="success"
                  />
                  <Typography
                    component="span"
                    sx={{
                      color: user.status === 'inactive' ? 'red' : 'green',
                      marginLeft: 1,
                    }}
                  >
                    {user.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => editUser(user.id)}
                    disabled={user.status === 'inactive'}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <br/>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteUser(user.id)}
                    disabled={user.status === 'inactive'}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
)};
export default UserTable;
