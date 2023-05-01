import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Category`);
    return { status: true, data: response.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};
