import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CartRoutes } from '../modules/cart/cart.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ProductRoutes } from '../modules/product/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    pathRouter: UserRoutes,
  },
  {
    path: '/auth',
    pathRouter: AuthRoutes,
  },
  {
    path: '/products',
    pathRouter: ProductRoutes,
  },
  {
    path: '/carts',
    pathRouter: CartRoutes,
  },
  {
    path: '/orders',
    pathRouter: OrderRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.pathRouter));

export default router;
