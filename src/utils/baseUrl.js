const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? process.env.API_SERVER_V1
    : process.env.API_PRODUCTION_SERVER;
export default baseUrl;
