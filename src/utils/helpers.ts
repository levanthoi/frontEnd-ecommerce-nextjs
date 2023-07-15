import type { RcFile } from 'antd/es/upload/interface';

const formatterCache: Record<string, Intl.NumberFormat> = {};

export const formatNumber = (number: number, locale: string = 'vi'): string => {
  let format = formatterCache[locale];
  if (!format) {
    if (locale === 'vi') {
      format = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    } else {
      format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    }
    formatterCache[locale] = format;
  }
  // console.log('format', format);

  return format.format(number);
};

export function getBase64(file: RcFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function cartesianProduct(arrs: any[]) {
  const n = arrs.length;
  const indices = new Array(n).fill(0);
  const maxIndices = arrs.map((arr) => arr.length - 1);
  const result = [];

  while (true) {
    // Add a new cartesian product
    const product = indices.map((index, i) => arrs[i][index]);
    result.push(product);

    // Move the indices to the next cartesian product
    let i = n - 1;
    while (i >= 0 && indices[i] === maxIndices[i]) {
      indices[i] = 0;
      i -= 1;
    }
    if (i < 0) break;
    indices[i] += 1;
  }

  return result;
}
