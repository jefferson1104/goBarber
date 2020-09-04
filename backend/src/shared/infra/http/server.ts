import 'reflect-metadata';

import express, { Request, Response, NextFunction } from  'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

//tratativas de erros
app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        satus: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });

  },
);
//route GET
/*
app.get('/', (request, response) => {
  return response.json({ message: 'My First Application' });
});
*/


//server configure
app.listen(3333, () => {
  console.log('🚀 Server Started on port 3333');
});

export default app;

