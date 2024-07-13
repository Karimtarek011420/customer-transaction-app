import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const handleError = (error) => {
  console.error('API request failed', error);
  throw error;
};

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
