import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';

const loginIntoDB = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong credentials!');
  }
  return user;
};

export const AuthServices = {
  loginIntoDB,
};
