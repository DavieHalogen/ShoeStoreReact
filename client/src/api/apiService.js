import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
         'Content-Type' : 'application/json',
  }
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
}, (error) => Promise.reject(error));


export const fetchShoes = async () => {
    try {
       const response = await api.get('/shoes');
       
       const shoesWithUrl = response.data.map((shoe) => ({
         ...shoe,
         imageUrl: `http://localhost:4000/images/shoes/${shoe.image}`,
       }))
       
         return shoesWithUrl;
    } catch (error) {
      console.error('Error fetching shoes..',error)
    throw error;
    }
};

export const fetchBackgroundImages = async () => {
  try {
    const response = await api.get('/backgroundImages');
    return response.data;
  } catch (error) {
    console.log('Error fetching background images', error)
    throw error;
  }
}

export const signUp = async (formData) => {
  try {
    const response = await api.post('/users/signup', formData);
    
    if (response.status === 201) {
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      return { success: true, message: 'Account created successfully!' };
    } else if(response.status === 409) {

    return { message: 'Username or email already exists...' }
   
    } else {
      const errorData = await response.json();
            alert(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (formData) => {
  try {
    const response = await api.post('/users/login', formData);
     console.log(response)
    if (response.status === 200) {
      
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      return { success: true, message: 'Login successful.'};
      
    } else if(response.status === 404) {
      
      return { message: 'User not found' };
      
    } else if(response.status === 403) {
      
      return { message: 'Your account is deactivated. Please contact support.' }
      
    } else {
      const errorData = await response.json();
            alert(errorData.message);
    }
  } catch (error) {
    console.log(error);
  }
};
