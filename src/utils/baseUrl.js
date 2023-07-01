export const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? process.env.NEXT_PUBLIC_API_SERVER_V2
    : process.env.NEXT_PUBLIC_API_SERVER_V1;
