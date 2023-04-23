export interface IShop {
  _id: string;
  seller?: {
    _id: string;
    title?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    is_owner?: string;
  };
  shop: {
    _id: string;
    title: string;
    phone: string;
    email: string;
    description?: string;
    openForDelivery?: boolean;
    takeAway?: boolean;
    selfDelivery?: boolean;
    currentlyOpen?: boolean;
    address?: string;
  };
}
