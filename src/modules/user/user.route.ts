import express from 'express';

import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/', UserControllers.getAllUsers);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getMe,
);

router.patch(
  '/update-me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateMe,
);

router.delete(
  '/delete-me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.deleteMe,
);

export const UserRoutes = router;
