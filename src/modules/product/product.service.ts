import { TProduct } from './product.interface';
import { Product } from './product.model';
// CREATE
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// GET ALL
const getAllProductsFromDB = async () => {
  const result = await Product.find({});
  return result;
};

// GET ONE
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// UPDATE
const updateProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

// DELETE
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
