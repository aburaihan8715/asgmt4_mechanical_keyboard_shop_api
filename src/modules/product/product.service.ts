import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';

import { TProduct } from './product.interface';
import { Product } from './product.model';
// CREATE
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

/*
NOTE: This is raw query
// GET ALL
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // A) BUILD QUERY
  const baseQuery = Product.find();

  // 01 filtering (exact match property)
  const queryObj = { ...query };
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  const filterQuery = baseQuery.find(queryObj);

  // 02 searching
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const productSearchableFields = ['title', 'brand'];
  const searchQuery = filterQuery.find({
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // 03 sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortedQuery = searchQuery.sort(sort);

  // 04 field limiting
  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
  }
  const fieldLimitQuery = sortedQuery.select(fields);

  // 05 paginating
  const page = (query.page as number) * 1 || 1;
  const limit = (query.limit as number) * 1 || 100;
  const skip = (page - 1) * limit;

  const paginateQuery = fieldLimitQuery.skip(skip).limit(limit);

  // B) EXECUTE QUERY
  const result = await paginateQuery;

  return result;
};
*/

// GET ALL
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .filter()
    .search(productSearchableFields)
    .sort()
    .fields()
    .paginate();

  const result = await productQuery.modelQuery;
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
