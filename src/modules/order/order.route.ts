import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { OrderValidationSchemas } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(OrderValidationSchemas.createOrderValidationSchema),
    OrderControllers.createOrder,
  )
  .get(OrderControllers.getAllOrders);

router.get('/:id', OrderControllers.getSingleOrder);

router.patch(
  '/:id',
  validateRequest(OrderValidationSchemas.updateOrderValidationSchema),
  OrderControllers.updateOrder,
);

router.delete('/:id', OrderControllers.deleteOrder);

export const OrderRoutes = router;
