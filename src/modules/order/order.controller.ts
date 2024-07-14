import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createOrder = catchAsync(async (req, res) => {
  const newOrder = await OrderServices.createOrderIntoDB({
    ...req.body,
  });

  if (!newOrder) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to creating new Order in DB',
    );
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Order created successfully !',
    data: newOrder,
  });
});

// GET ALL
const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderServices.getAllOrdersFromDB({
    ...req.query,
  });

  if (!orders || orders.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: orders,
  });
});

// GET ONE
const getSingleOrder = catchAsync(async (req, res) => {
  const order = await OrderServices.getSingleOrderFromDB(req.params.id);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: order,
  });
});

// UPDATE
const updateOrder = catchAsync(async (req, res) => {
  const updatedOrder = await OrderServices.updateOrderIntoDB(
    req.params.id,
    {
      ...req.body,
    },
  );

  if (!updatedOrder) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Order!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully !',
    data: updatedOrder,
  });
});

// DELETE
const deleteOrder = catchAsync(async (req, res) => {
  const deletedOrder = await OrderServices.deleteOrderFromDB(
    req.params.id,
  );

  if (!deletedOrder) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Order!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully !',
    data: deletedOrder,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
