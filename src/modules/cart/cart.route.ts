import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CartValidationSchemas } from './cart.validation';
import { CartControllers } from './cart.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(CartValidationSchemas.createCartValidationSchema),
    CartControllers.createCart,
  )
  .get(CartControllers.getAllCarts);

router.get('/:id', CartControllers.getSingleCart);

router.patch(
  '/:id',
  validateRequest(CartValidationSchemas.updateCartValidationSchema),
  CartControllers.updateCart,
);

router.delete('/:id', CartControllers.deleteCart);

export const CartRoutes = router;
