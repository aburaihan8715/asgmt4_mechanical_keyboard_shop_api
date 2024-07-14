import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { TUser } from '../user/user.interface';

const registerIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginFromDB = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong credentials!');
  }
  return user;
};

export const AuthServices = {
  loginFromDB,
  registerIntoDB,
};
