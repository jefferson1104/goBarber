import { startOfHour } from 'date-fns';
import { injectable, inject} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

//DTO - Data Transfer Object (recebendo informações)
interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository : IAppointmentsRepository,
  ) {}



  //método execute, informa que esta criando um novo appointment
  public async execute({date, provider_id}: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);//regra de negocio para que o agendamento so acontece de hora em hora

    //verifica se ja existe algum appointment com com a data recebida
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    //tratativa de erros/excessoes: caso a data não estiver disponive, ou seja ja existir um appointment com a data retornar erro
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    //Criando o objeto do appointment e salvando dados do objeto appointment no banco de dados
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

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
