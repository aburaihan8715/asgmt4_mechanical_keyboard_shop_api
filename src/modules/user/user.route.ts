import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchemas } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidationSchemas.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
