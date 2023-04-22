import type { RcFile } from 'antd/es/upload/interface';

export const formatNumber = (locale: string | undefined, number: number) => {
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
