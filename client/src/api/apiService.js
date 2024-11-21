import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add token to Authorization header if available
api.interceptors.request.use(
 (config) => {
   const profile = localStorage.getItem('profile');
   if (profile) {
     const { token } = JSON.parse(profile);
     config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchShoes = async () => {
  try {
    const response = await api.get('/shoes');
    const shoesWithUrl = response.data.map((shoe) => ({
      ...shoe,
      imageUrl: `http://localhost:4000/images/shoes/${shoe.image}`,
    }));
    return shoesWithUrl;
  } catch (error) {
    console.error('Error fetching shoes:', error);
    throw error;
  }
};

export const fetchBackgroundImages = async () => {
  try {
    const response = await api.get('/backgroundImages');
    return response.data;
  } catch (error) {
    console.error('Error fetching background images:', error);
    throw error;
  }
};

export const signUp = async (formData) => {
  try {
    const response = await api.post('/users/signup', formData);

    if (response.status === 201) {
      const  data  = response.data.result;
      localStorage.setItem('profile', JSON.stringify(data));
      return { success: true, message: 'Account created successfully!' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error('Username or email already exists.');
      }
    }
    throw new Error('Something went wrong');
  }
};

export const signIn = async (formData) => {
  try {
    const response = await api.post('/users/login', formData);
    if (response.status === 200) {
      const data  = response.data.result;
      localStorage.setItem('profile', JSON.stringify(data));
      return { success: true, message: 'Login successful.' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Incorrect password.');
    } else if (error.response.status === 404) {
        throw new Error('User not found');
      } else if (error.response.status === 403) {
        throw new Error('Your account is deactivated. Please contact support.');
      }
    }
    throw new Error('Something went wrong.');
  }
};

export const createAdmin = async (formData) => {
  try {
    const response = await api.post('/admin/create-admin', formData)
    if (response.status === 201) {
      return { success: true, message: 'Account created successfully!' };
    }
    
  } catch (error) {
   if (error.response) {
     if (error.response.status === 409) {
       throw new Error('Username or email already exists.');
      }else if (error.response.status === 403) {
        throw new Error('Access denied');
      }
    throw new Error('Something went wrong.');
  }
}
};

export const fetchDashboardMetrics = async () => {
  
  try {
    const response = await api.get('/admin/dashboard');
    console.log(response);
    return response;
  } catch (error) {
    
  }
};