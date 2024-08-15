export type TOrderProduct = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  address: string;
  email: string;
  name: string;
  mobile: string;
  products: TOrderProduct[];
  totalAmount: number;
  totalQuantity: number;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
};
