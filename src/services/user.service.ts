// import axios from 'axios';
import http from '@/utils/config';

export async function loginAccount(params: any) {
  console.log('params', params);
  return http.post(`/v1/user/login-admin`, params, { withCredentials: true });
}
