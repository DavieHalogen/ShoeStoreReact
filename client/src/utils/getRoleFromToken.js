import {jwtDecode} from 'jwt-decode';

const getRoleFromToken = () => {
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
}

export default getRoleFromToken;