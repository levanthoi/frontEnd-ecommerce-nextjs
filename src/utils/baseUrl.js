export const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? process.env.API_LOCAL_SERVER
    : process.env.API_PRODUCTION_SERVER;
