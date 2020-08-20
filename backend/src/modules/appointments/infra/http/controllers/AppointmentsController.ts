import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    //pegando dados do usuario para criar appointmentS
    const { provider_id, date } = request.body;

    //tratando a data que recebemos nos dados antes de passar para o objeto
    const parsedDate = parseISO(date);//transforma a string em data (objeto Date)

    const CreateAppointment = container.resolve(CreateAppointmentService)

    const appointment = await CreateAppointment.execute({
      date: parsedDate,
      provider_id
    });

    //resutlado do appointment
    return response.json(appointment);
  }
}
