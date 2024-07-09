import express, { Request, Response, Application } from 'express';

export const app: Application = express();

// TEST ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});
