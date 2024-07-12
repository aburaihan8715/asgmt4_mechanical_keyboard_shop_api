import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchemas } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
