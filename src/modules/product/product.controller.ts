import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  const newProduct = await ProductServices.createProductIntoDB({
    ...req.body,
  });

  if (!newProduct) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to creating new product in DB',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully !',
    data: newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductServices.getAllProductsFromDB({
    ...req.query,
  });

  if (!products || products.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully !',
    data: products,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const product = await ProductServices.getSingleProductFromDB(
    req.params.id,
  );

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const updatedProduct = await ProductServices.updateProductIntoDB(
    req.params.id,
    { ...req.body },
  );

  if (!updatedProduct) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update product!',
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully !',
    data: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const deletedProduct = await ProductServices.deleteProductFromDB(
    req.params.id,
  );

  if (!deletedProduct) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete product!',
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully !',
    data: deletedProduct,
  });
});

const deductProductQuantity = catchAsync(async (req, res) => {
  const { orderData } = req.body;

  if (!orderData || !Array.isArray(orderData)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid order data!');
  }

  const updatePromises = orderData.map((item) =>
    ProductServices.deductProductQuantityFromDB(
      item.productId,
      item.quantity,
    ),
  );

  await Promise.all(updatePromises);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product quantities updated successfully!',
    data: null,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deductProductQuantity,
};
