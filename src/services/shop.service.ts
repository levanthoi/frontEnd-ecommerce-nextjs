import http from '@/utils/config';

export async function createShop(params: any) {
  // console.log(http);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/shop`, params);
}
export async function getShop(params: any) {
  const { fields } = params;
  return http.get(`/v1/shop/getlist/?fields=${fields}`);
}
export async function getActiveShop(params: any) {
  const { fields } = params;
  return http.get(`/v1/shop/getActive/?fields=${fields}`);
}
export async function getoneShop(params: any) {
  const { id } = params;
  return http.get(`/v1/shop/getone/${id}`);
}
export async function updateShop(params: any) {
  console.log('params update', params);
  const { id, payload } = params;
  return http.put(`/v1/shop/update/${id}`, payload);
}
export async function deleteShop(params: any) {
  console.log('id', params);

  return http.delete(`/v1/shop/delete/${params}`);
}
