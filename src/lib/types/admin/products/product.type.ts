import { IAttribute } from '../attributes/attribute.type';

export interface IRating {
  star?: number;
  comment?: string;
  postedBy: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  description?: string;
  slug?: string;
  unitPrice: number;
  purchasePrice: number;
  quantity: number;
  sold?: number;
  images?: string[];
  brand_id?: string;
  category_id?: string;
  shop_id?: string;
  variants?: Array<{ variant: string; value: string[] }>;
  attributes: IAttribute[];
  discount: string;
  tax: string;
  productType: string;
  sku: string;
  unit: string;
  ratings?: IRating[];
  details?: Array<{
    variant: string;
    stock: number;
    sku: string;
    variantPrice: number;
  }>;
  totalRatings?: string;
}
