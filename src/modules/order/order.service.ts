import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductServices } from '../product/product.service';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// CREATE
const createOrderIntoDB = async (payload: TOrder) => {
  const { products } = payload;
  const result = await Order.create(payload);

  for (const item of products) {
    const { productId, quantity } = item;
    const product =
      await ProductServices.getSingleProductFromDB(productId);

    if (!product || product.availableQuantity < quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock!');
    }

    await ProductServices.deductProductQuantityFromDB(productId, quantity);
  }

  return result;
};

// GET ALL
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await orderQuery.modelQuery;
  return result;
};
// GET ONE
const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

// UPDATE
const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

// DELETE
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
