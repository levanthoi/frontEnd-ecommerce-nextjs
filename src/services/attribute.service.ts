import http from '@/utils/config';

export async function createAttribute(params: any) {
  // console.log(http);
  // console.log('process', process.env.NEXT_PUBLIC_API_SERVER_V1);
  return http.post(`/v1/attribute`, params);
}
export async function getAttribute(params: any) {
  const { fields } = params;
  return http.get(`/v1/attribute/getlist/?fields=${fields}`);
}
export async function getoneAttribute(params: any) {
  const { id } = params;
  return http.get(`/v1/attribute/getone/${id}`);
}
export async function updateAttribute(params: any) {
  console.log('params update', params);
  const { id, payload } = params;
  return http.put(`/v1/attribute/update/${id}`, payload);
}
export async function deleteAttribute(params: any) {
  console.log('id', params);

  return http.delete(`/v1/attribute/delete/${params}`);
}
