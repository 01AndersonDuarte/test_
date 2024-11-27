import axios from 'axios';

const baseURL: string = import.meta.env.VITE_SHOPPER_API || '';

const instance = axios.create({
  baseURL
});

export default instance;
