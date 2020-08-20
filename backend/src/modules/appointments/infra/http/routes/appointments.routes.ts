import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

//aplicando o middleware em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

//Rota responsavel por criar appointments
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
