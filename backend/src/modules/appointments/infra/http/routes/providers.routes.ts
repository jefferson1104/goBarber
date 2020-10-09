import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

//aplicando o middleware em todas as rotas
providersRouter.use(ensureAuthenticated);

//Rota responsavel por criar appointments
providersRouter.get('/', providersController.index);

export default providersRouter;
