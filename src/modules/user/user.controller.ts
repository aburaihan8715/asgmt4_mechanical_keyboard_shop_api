import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createUser = catchAsync(async (req, res) => {
  const newUser = await UserServices.createUserIntoDB({
    ...req.body,
  });

  if (!newUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to create new user in DB',
    );
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User created successfully !',
    data: newUser,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB();

  if (!users || users.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: user,
  });
});
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
