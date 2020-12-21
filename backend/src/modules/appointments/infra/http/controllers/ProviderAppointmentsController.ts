import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';


export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    //recuperar usuario logado
    const provider_id = request.user.id;

    //pegando dados do usuario para criar appointments
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    //resutlado do appointment
    return response.json(appointments);
  }
}
