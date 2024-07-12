import express from 'express';
import { ProductControllers } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidationSchemas } from './product.validation';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(
      ProductValidationSchemas.createProductSchemaValidation,
    ),
    ProductControllers.createProduct,
  )
  .get(ProductControllers.getAllProducts);

router.get('/:id', ProductControllers.getSingleProduct);

router.patch(
  '/:id',
  validateRequest(ProductValidationSchemas.updateProductSchemaValidation),
  ProductControllers.updateProduct,
);

router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
