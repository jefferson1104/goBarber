import { Router } from 'express'
import appointmentsRouter from './appointments.routes';


const routes = Router()

//Toda rota que iniciar com /appointments , passar para o appontiments.router
routes.use('/appointments', appointmentsRouter)


export default routes;
