import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


//DTO - Data Transfer Object (recebendo informações)
interface Request {
  provider_id: string;
  date: Date;
}


class CreateAppointmentService {
  //método execute, informa que esta criando um novo appointment
  public async execute({date, provider_id}:Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);//regra de negocio para que o agendamento so acontece de hora em hora

    //verifica se ja existe algum appointment com com a data recebida
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    //tratativa de erros/excessoes: caso a data não estiver disponive, ou seja ja existir um appointment com a data retornar erro
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    //Criando o objeto do appointment
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    //salvando dados do objeto appointment no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }

}''

export default CreateAppointmentService;


/**
 * TUDO QUE É REGRA DE NEGOCIO,
 * TUDO QUE FOR LOGICA DE PROGRAMAÇÃO
 * È COMPETENCIA DO SERVICE TRATAR
 *
 * cada service criado deve conter apenas uma unica exclusiva funcionalidade
 * entao para cada logica e regra de negocio crie um service responsavel
 *
*/
