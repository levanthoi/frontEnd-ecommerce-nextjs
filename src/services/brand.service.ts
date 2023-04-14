import http from '@/utils/config';

export async function createBrand(params: any) {
  // console.log(http);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/brand`, params, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
}
export async function getBrand(params: any) {
  const { fields } = params;
  return http.get(`/v1/brand/getlist/?fields=${fields}`);
}
export async function getoneBrand(params: any) {
  const { id } = params;
  return http.get(`/v1/brand/getone/${id}`);
}
export async function updateBrand(params: any) {
  console.log('params update', params);
  const { id, payload } = params;
  return http.put(`/v1/brand/update/${id}`, payload);
}
export async function deleteBrand(params: any) {
  console.log('id', params);

  return http.delete(`/v1/brand/delete/${params}`);
}
