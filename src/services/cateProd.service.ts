import http from '@/utils/config';

export async function createCateProd(params: any) {
  console.log('params', params);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/prodCate/`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
export async function getCateProd(params: any) {
  const { fields } = params;
  return http.get(`/v1/prodCate/getlist/?fields=${fields}`);
}
export async function getoneCateProd(params: any) {
  const { id } = params;
  return http.get(`/v1/prodCate/getone/${id}`);
}
export async function updateCateProd(params: any) {
  console.log('params update', params);
  const { id, payload } = params;
  return http.put(`/v1/prodCate/update/${id}`, payload);
}
export async function deleteCateProd(params: any) {
  console.log('id', params);

  return http.delete(`/v1/prodCate/delete/${params}`);
}
export async function deleteImageCateProd(params: any) {
  return http.delete(`/v1/prodCate/upload/${params}`);
}
