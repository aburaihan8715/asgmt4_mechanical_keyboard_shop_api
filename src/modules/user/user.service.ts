import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async () => {
  const users = await User.find({});

  if (!users || users.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }
  return users;
};

const getMeFromDB = async (userId: string, role: string) => {
  const user = await User.findOne({ _id: userId, role: role });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  return user;
};

const updateMeIntoDB = async (
  userId: string,
  role: string,
  payload: Partial<IUser>,
) => {
  const user = await User.findOne({ _id: userId, role: role });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found!');
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, role: role },
    payload,
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update data!');
  }

  return updatedUser;
};

const deleteMeFromDB = async (userId: string, role: string) => {
  const user = await User.findOneAndDelete({ _id: userId, role: role });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete data!');
  }

  return user;
};

export const UserServices = {
  getAllUsersFromDB,
  getMeFromDB,
  updateMeIntoDB,
  deleteMeFromDB,
};
