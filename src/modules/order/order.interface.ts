export type TOrderProduct = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  userId: string;
  products: TOrderProduct[];
  costAmount: number;
  amount: number;
  address: string;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
};
