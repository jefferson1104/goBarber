import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//aplicando o middleware em todas as rotas
appointmentsRouter.use(ensureAuthenticated);

//Rota responsavel por listar appointments
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});


//Rota responsavel por criar appointments
appointmentsRouter.post('/', async (request, response) => {

  //tratativa de erro com try/cacth, pegando mensagem de erro do service
  try {
    //pegando dados do usuario para criar appointmentS
    const { provider_id, date } = request.body;

    //tratando a data que recebemos nos dados antes de passar para o objeto
    const parsedDate = parseISO(date);//transforma a string em data (objeto Date)

    const CreateAppointment = new CreateAppointmentService();

    const appointment = await CreateAppointment.execute({
      date: parsedDate,
      provider_id
    });

    //resutlado do appointment
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

});


export default appointmentsRouter;


/**
 * TUDO QUE FOR TRANSFORMAÇÃO DE DADOS DEIXAMOS NAS ROTAS
 *  Unicas responsabilidades das rotas
 *  Rota: receber requisição. chamar outro arquivo, devolver uma resposta
 *  Caso houver alguma condição a mais do que isso
 *  devemos abstrair criando um service
 *
 * Neste caso recebemos a requisição, repassamos para outro arquivo que no caso
 * pode ser um repositorie ou um service e retorna uma resposta baseada no que
 * o sevice fez com os dados
 *
*/
