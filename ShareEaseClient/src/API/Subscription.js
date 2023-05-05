import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const getSubscriptionByUser = async id => {
  console.log(id);
  try {
    const response = await axios.get(`${BASE_URL}/Subscription/user/${id}`);
    console.log(response.data);
    return { status: true, data: response.data };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addSubscription = async (id, userId) => {
  console.log({
    categoryId: id,
    userId: userId,
  });
  try {
    const response = await axios.post(`${BASE_URL}/Subscription`, {
      categoryId: id,
      userId: userId,
    });
    if (response.status === 200) {
      console.log('successful!', response.data);

      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred', error);
    return null;
  }
};
