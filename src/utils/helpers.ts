import type { RcFile } from 'antd/es/upload/interface';

export const formatNumber = (locale: string, number: number) => {
  let format;
  if (locale) {
    if (locale === 'vi') {
      format = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        number,
      );
    } else {
      format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        number,
      );
    }
  }
  return format;
};

export function getBase64(file: RcFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
