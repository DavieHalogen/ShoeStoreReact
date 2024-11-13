import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
         'Content-Type' : 'application/json',
  }
})


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
      return { success: true, message: 'Account created successfully!' };
    }

    return { success: false, message: 'Unexpected error during registration' };
    
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw { response: { status: 409, data: 'Username or email already exists...' } };
    } else {
      throw error;
    }
  }
};
