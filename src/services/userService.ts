// import axios from 'axios';
import http from '@/utils/config';

// axios.defaults.baseURL = process.env.API_SERVER_V1;
// axios.defaults.withCredentials = true;

export async function loginAccount(params: any) {
  console.log('params', params);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/user/login-admin`, params);
  // try {
  // } catch (err) {
  //   return err;
  // }
}
