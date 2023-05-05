import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const getAllRequest = async data => {
  try {
    const response = await axios.get(`${BASE_URL}/Request`);
    if (response.status === 201 || response.status === 200) {
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred while signing up:', error);
    return null;
  }
};

export const postRequest = async data => {
  console.log(data);
  try {
    const response = await axios.post(`${BASE_URL}/Request`, data);
    if (response.status === 201 || response.status === 200) {
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred ', error);
    return null;
  }
};

export const putRequest = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/Request/${id}`, data);
    if (response.status === 204 || response.status === 200) {
      return { status: true };
    } else if (response.status === 401) {
      return { status: false };
    }
  } catch (error) {
    console.error('Error occurred', error);
    return null;
  }
};
export const deleteRequest = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/Request/${id}`);
    if (response.status === 204 || response.status === 200) {
      return { status: true };
    } else if (response.status === 401) {
      return { status: false };
    }
  } catch (error) {
    console.error('Error occurred while signing up:', error);
    return null;
  }
};
