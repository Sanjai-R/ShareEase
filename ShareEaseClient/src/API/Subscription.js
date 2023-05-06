import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const getSubscriptionByUser = async id => {

  try {
    const response = await axios.get(`${BASE_URL}/Subscription/user/${id}`);
    
    return { status: true, data: response.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addSubscription = async (id, userId) => {
 
  try {
    const response = await axios.post(`${BASE_URL}/Subscription`, {
      categoryId: id,
      userId: userId,
    });
    if (response.status === 200) {
    

      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred', error);
    return null;
  }
};
