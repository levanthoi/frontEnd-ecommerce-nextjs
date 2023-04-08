import axios from 'axios';
import Cookies from 'js-cookie';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_V1 || 'http://localhost:5000',
  timeout: 3000,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// http

http.interceptors.request.use(
  (config) => {
    // console.log('data', Cookies.get('data'));
    const user = Cookies.get('data') ? JSON.parse(Cookies.get('data')) : null;
    // console.log('token', user);
    const cf = config;
    if (user) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      cf.headers.authorization = `Bearer ${user.token}`; // for Node.js Express back-end
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
