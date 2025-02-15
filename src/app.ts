import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
import config from './config';

export const app: Application = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://mechanical-keyboard-asgmt4.netlify.app',
      'http://localhost:5173',
    ],
  }),
);

// LOGGER MIDDLEWARE
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// TEST ROUTE
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello From Server!!',
  });
});

// ROUTES
app.use('/api/v1', router);

// NOT FOUND ROUTE HANDLER
app.use(notFound);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);
