import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { CartServices } from './cart.service';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createCart = catchAsync(async (req, res) => {
  const newCart = await CartServices.createCartIntoDB({
    ...req.body,
  });

  if (!newCart) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to creating new cart in DB',
    );
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Cart created successfully !',
    data: newCart,
  });
});

// GET ALL
const getAllCarts = catchAsync(async (req, res) => {
  const carts = await CartServices.getAllCartsFromDB({
    ...req.query,
  });

  if (!carts || carts.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Carts retrieved successfully !',
    data: carts,
  });
});

// GET ONE
const getSingleCart = catchAsync(async (req, res) => {
  const cart = await CartServices.getSingleCartFromDB(req.params.id);

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully !',
    data: cart,
  });
});

// UPDATE
const updateCart = catchAsync(async (req, res) => {
  const updatedCart = await CartServices.updateCartIntoDB(req.params.id, {
    ...req.body,
  });

  if (!updatedCart) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Cart!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart updated successfully !',
    data: updatedCart,
  });
});

// DELETE
const deleteCart = catchAsync(async (req, res) => {
  const deletedCart = await CartServices.deleteCartFromDB(req.params.id);

  if (!deletedCart) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Cart!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart deleted successfully !',
    data: deletedCart,
  });
});

export const CartControllers = {
  createCart,
  getAllCarts,
  getSingleCart,
  updateCart,
  deleteCart,
};
