// src/index.js
import express, { Express, Request, Response } from 'express';
import authRouter from './routes/auth.route';
import todoRouter from './routes/todo.route';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app: Express = express();
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: '*',
  })
);

app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/v1/users', authRouter);
app.use('/api/v1/todos', todoRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
