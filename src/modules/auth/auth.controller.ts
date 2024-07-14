import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';

// REGISTER
const register = catchAsync(async (req, res) => {
  const newUser = await AuthServices.registerIntoDB({
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

// LOGIN
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginFromDB({
    ...req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
};
