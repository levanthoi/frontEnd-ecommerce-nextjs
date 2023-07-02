import { IAttribute } from '../attributes/attribute.type';
import { IBrand } from '../brands/brand.type';
import { ICateProd } from '../cateProd.type';
import { IShop } from '../shops/shop.type';

export interface IRating {
  star?: number;
  comment?: string;
  postedBy: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description?: string;
  slug?: string;
  unitPrice: number;
  purchasePrice: number;
  quantity: number;
  sold?: number;
  thumb?: any;
  images?: any;
  brand?: IBrand;
  category?: ICateProd;
  shop?: IShop['shop'];
  variants?: Array<{ _id: string; variant?: string; value: string[] }>;
  // attributes: IAttribute[];
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
