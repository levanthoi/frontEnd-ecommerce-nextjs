export interface IOrder {
  _id: string;
  variant: string;
  unit: string;
  stock: number;
  quantity: number;
  variantPrice: number;
  totalPrice?: number;
  image: {
    uid: string;
    url: string;
  };
}
export interface IDataType {
  _id: string;
  title: string;
  unit: string;
  stockTotal: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
