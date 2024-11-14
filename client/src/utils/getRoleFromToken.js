import jwtDecode from 'jwt-decode';

export const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
        return decodedToken.role;
    } catch (error) {
    console.log('Invalid token')  
    };
  return null;
};