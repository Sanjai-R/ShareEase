import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const Signup = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/User`, data);
   
    if (response.status === 201) {
   
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred while signing up:', error);
    return null;
  }
};

export const Login = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/User/Login`, data);

   
    if (response.status === 200) {
     

      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred while login:', error);
    return { status: false, data: error };
  }
};
