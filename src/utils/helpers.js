export const formatNumber = (locale, number) => {
  let format;
  if (locale === 'vi') {
    format = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  } else {
    format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  }
  return format;
};
