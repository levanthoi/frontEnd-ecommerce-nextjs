import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from './baseUrl';

const http = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
});

// http

http.interceptors.request.use(
  (config) => {
    // console.log('data', Cookies.get('data'));
    const acccessToken = Cookies.get('acccessToken')
      ? JSON.parse(Cookies.get('accessToken'))
      : null;
    console.log('token', acccessToken);
    const cf = config;
    if (acccessToken) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      cf.headers.authorization = `Bearer ${acccessToken}`; // for Node.js Express back-end
    }

    // console.log('cf', cf);
    return cf;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // console.log('err api config', err);
    const originalConfig = err.config;

    if (originalConfig?.url !== '/v1/user/login-admin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await http.get('/v1/user/refresh');
          // console.log('rs', rs);

          const { accessToken } = rs.data;
          const user = Cookies.get('data') ? JSON.parse(Cookies.get('data')) : null;
          if (user) {
            user.token = accessToken;
            Cookies.set('data', JSON.stringify(user));
          }
          // TokenService.updateLocalAccessToken(accessToken);

          return http(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err?.response);
  },
);

export default http;
