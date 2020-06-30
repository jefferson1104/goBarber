import { Router } from 'express'

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router()

//Toda rota que iniciar com /appointments , passar para o appontiments.router
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)


export default routes;
