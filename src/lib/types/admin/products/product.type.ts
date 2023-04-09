export interface IRating {
  star?: number;
  comment?: string;
  postedBy: string;
}

export interface IProduct {
  key?: string;
  title: string;
  description?: string;
  slug?: string;
  price: number;
  quantity: number;
  sold?: number;
  images?: string[];
  color?: string;
  brand?: string;
  category?: string;
  ratings?: IRating[];
  totalRatings?: string;
}
