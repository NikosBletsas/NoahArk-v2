console.log("src/api.ts: Before swagger-typescript-api integration");
import axios from 'axios';

const API_BASE_URL = '/api/LoginAPI'; // Adjust if needed

export const Init = async () => {
  console.log('Init API called'); // Add log
  try {
    const response = await axios.get(`${API_BASE_URL}/Init`);
    console.log('Init API Response:', response); // Add log
    return response.data;
  } catch (error: any) {
    console.error('Init API Error:', error);
    console.error('Init API Error Details:', error.message, error.response); // Add log
    throw error;
  }
};

export const Login = async (username: string, password: string) => {
  console.log('Login API called'); // Add log
  try {
    const response = await axios.post(`${API_BASE_URL}/Login`, { username, password });
    console.log('Login API Response:', response); // Add log
    return response.data;
  } catch (error: any) {
    console.error('Login API Error:', error);
    console.error('Login API Error Details:', error.message, error.response); // Add log
    throw error;
  }
};

export const LoginOffline = async () => {
  console.log('LoginOffline API called'); // Add log
  try {
    const response = await axios.get(`${API_BASE_URL}/LoginOffline`);
    console.log('LoginOffline API Response:', response); // Add log
    return response.data;
  } catch (error: any) {
    console.error('LoginOffline API Error:', error);
    console.error('LoginOffline API Error Details:', error.message, error.response); // Add log
    throw error;
  }
};