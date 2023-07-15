import http from '@/utils/config';

export async function createBrand(params: any) {
  // console.log(http);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/brand`, params);
}
export async function getBrand(params: any) {
  const { fields } = params;
  return http.get(`/v1/brand/getlist/?fields=${fields}`);
}
export async function getActiveBrand(params: any) {
  const { fields } = params;
  return http.get(`/v1/brand/getActive/?fields=${fields}`);
}
export async function getoneBrand(params: any) {
  const { id } = params;
  return http.get(`/v1/brand/getone/${id}`);
}
export async function updateBrand(params: any) {
  const { id, payload } = params;
  return http.put(`/v1/brand/update/${id}`, payload);
}
export async function deleteBrand(params: any) {
  return http.delete(`/v1/brand/delete/${params}`);
}
export async function deleteFileBrand(params: any) {
  return http.delete(`/v1/brand/upload/${params}`);
}
