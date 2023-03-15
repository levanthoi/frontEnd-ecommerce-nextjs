export const dataNavbars = [
  {
    id: 1,
    title: 'Trang chủ',
    slug: '/',
    children: null,
  },
  {
    id: 2,
    title: 'Giới thiệu',
    slug: '/gioi-thieu',
    children: null,
  },
  {
    id: 3,
    title: 'Khuyến mãi Hot',
    slug: '/khuyen-mai-hot',
    children: null,
  },
  {
    id: 4,
    title: 'Tin tức',
    slug: '/tin-tuc',
    children: null,
  },
  {
    id: 5,
    title: 'Tuyển dụng',
    slug: '/tuyen-dung',
    children: null,
  },
  {
    id: 6,
    title: 'Liên hệ',
    slug: '/lien-he',
    children: null,
  },
  {
    id: 7,
    title: 'Sản phẩm',
    slug: '/san-pham',
    children: [
      {
        category: {
          id: 1,
          title: 'fashion',
        },
        productsGroup: ['jeans'],
      },
    ],
  },
];
