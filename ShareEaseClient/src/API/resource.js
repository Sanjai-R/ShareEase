import axios from 'axios';
import { BASE_URL } from '../constant/endPoints';

export const getAllResource = async data => {
  try {
    const response = await axios.get(`${BASE_URL}/Resource`);
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

export const getResourceById = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/Resource/${id}`);
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
export const PostResource = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/Resource`, data);
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
export const updateResource = async (id, data) => {
 
  try {
    const response = await axios.put(`${BASE_URL}/Resource/${id}`, data);
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
export const deleteResource = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/Resource/${id}`);
    if (response.status === 204 || response.status === 200) {
      return { status: true };
    } else if (response.status === 401) {
      return { status: false };
    }
  } catch (error) {
    console.error('Error occurred ', error);
    return null;
  }
};

export const getRecommendation = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/Resource/user/${id}`);
    if (response.status === 204 || response.status === 200) {
      return { status: true, data: response.data };
    } else if (response.status === 401) {
      return { status: false, data: response.data };
    }
  } catch (error) {
    console.error('Error occurred ', error);
    return null;
  }
};
