import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

// REGISTER
const register = catchAsync(async (req, res) => {
  const newUser = await AuthServices.registerIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User register successfully !',
    data: newUser,
  });
});

// LOGIN
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, loginUser } =
    await AuthServices.loginFromDB(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: config.NODE_ENV === 'production',
    secure: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: { accessToken, loginUser },
  });
});

export const AuthControllers = {
  register,
  login,
};
