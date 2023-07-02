import http from '@/utils/config';

export async function createProduct(params: any) {
  // console.log(http);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/product`, params);
}
export async function exportProduct(params: any) {
  return http.post(`/v1/product/export`, params);
}
export async function getProduct(params: any) {
  const { fields } = params;
  return http.get(`/v1/product/getlist/?fields=${fields}`);
}
export async function getActiveProduct(params: any) {
  const { fields } = params;
  return http.get(`/v1/product/getActive/?fields=${fields}`);
}
export async function getoneProduct(params: any) {
  const { id } = params;
  return http.get(`/v1/product/getone/${id}`);
}
export async function updateProduct(params: any) {
  console.log('params update', params);
  const { id, payload } = params;
  return http.put(`/v1/product/update/${id}`, payload);
}
export async function deleteProduct(params: any) {
  console.log('id', params);

  return http.delete(`/v1/product/delete/${params}`);
}

export async function uploadProduct(params: any) {
  return http.post(`/v1/product/upload`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
export async function deleteImageProduct(params: any) {
  return http.delete(`/v1/product/upload/${params}`);
}
