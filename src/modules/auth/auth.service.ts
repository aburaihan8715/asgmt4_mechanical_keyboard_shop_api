import { SignOptions } from 'jsonwebtoken';
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';

import config from '../../config';
import { createToken } from './auth.utils';
import { IUser } from '../user/user.interface';

const registerIntoDB = async (payload: IUser) => {
  const newUser = await User.create(payload);

  if (!newUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to create data!');
  }

  return newUser;
};

const loginFromDB = async (payload: TLogin) => {
  const loginUser = await User.findOne({ email: payload.email });

  if (!loginUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong credentials!');
  }

  const jwtPayload = {
    _id: loginUser._id,
    email: loginUser.email,
    role: loginUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT.jwt_access_secret as string,
    config.JWT.jwt_access_expires_in as SignOptions['expiresIn'],
  );

  const refreshToken = createToken(
    jwtPayload,
    config.JWT.jwt_access_secret as string,
    config.JWT.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  return {
    loginUser,
    refreshToken,
    accessToken,
  };
};

export const AuthServices = {
  loginFromDB,
  registerIntoDB,
};
