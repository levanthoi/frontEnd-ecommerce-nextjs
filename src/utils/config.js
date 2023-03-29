import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_V1 || 'http://localhost:5000',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export default http;
