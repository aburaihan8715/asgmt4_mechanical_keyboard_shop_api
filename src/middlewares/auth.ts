import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { decodeToken } from '../modules/auth/auth.utils';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let token = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      // checking if the token is missing
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized!',
        );
      }
      const decoded = await decodeToken(
        token,
        config.JWT.jwt_access_secret as string,
      );

      const { role, _id, iat } = decoded;

      // checking if the user is exist
      const user = await User.findById(_id);

      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'This user is not found !',
        );
      }

      // check whether password change before JWT issue
      if (
        user.passwordChangedAt &&
        User.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized !',
        );
      }

      // check role
      if (roles.length > 0 && !roles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized!',
        );
      }

      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
