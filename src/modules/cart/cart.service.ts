import QueryBuilder from '../../builder/QueryBuilder';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';

// CREATE
const createCartIntoDB = async (payload: TCart) => {
  const result = await Cart.create(payload);
  return result;
};

// GET ALL
const getAllCartsFromDB = async (query: Record<string, unknown>) => {
  const cartQuery = new QueryBuilder(Cart.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await cartQuery.modelQuery;
  return result;
};

// GET ONE
const getSingleCartFromDB = async (id: string) => {
  const result = await Cart.findById(id);
  return result;
};

// UPDATE
const updateCartIntoDB = async (id: string, payload: Partial<TCart>) => {
  const result = await Cart.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

// DELETE
const deleteCartFromDB = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  return result;
};

export const CartServices = {
  createCartIntoDB,
  getAllCartsFromDB,
  getSingleCartFromDB,
  updateCartIntoDB,
  deleteCartFromDB,
};
