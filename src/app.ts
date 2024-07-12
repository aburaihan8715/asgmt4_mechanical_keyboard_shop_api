import express, { Request, Response, Application } from 'express';
import { ProductRoutes } from './modules/product/product.route';
import cors from 'cors';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { UserRoutes } from './modules/user/user.route';
import { AuthRoutes } from './modules/auth/auth.route';

export const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// TEST ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// ROUTES
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

// NOT FOUND ROUTE HANDLER
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);
