import 'reflect-metadata';
import express, { request, response } from  'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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

