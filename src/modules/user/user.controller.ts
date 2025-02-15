import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: users,
  });
});

const getMe = catchAsync(async (req, res) => {
  const userId = req.user?._id as string;
  const role = req.user?.role as string;
  const user = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: user,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const userId = req.user?._id as string;
  const role = req.user?.role as string;
  const updatedUser = await UserServices.updateMeIntoDB(
    userId,
    role,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: updatedUser,
  });
});

const deleteMe = catchAsync(async (req, res) => {
  const userId = req.user?._id as string;
  const role = req.user?.role as string;
  const user = await UserServices.deleteMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: user,
  });
});

export const UserControllers = {
  getAllUsers,
  getMe,
  updateMe,
  deleteMe,
};
