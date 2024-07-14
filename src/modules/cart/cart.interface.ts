export type TCartProduct = {
  productId: string;
  quantity: number;
};

export type TCart = {
  userId: string;
  products: TCartProduct[];
  constAmount: number;
  amount: number;
  address: object;
  status: string;
};
