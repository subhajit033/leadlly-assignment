// src/index.js
import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth.route';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app: Express = express();
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/v1/users', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
