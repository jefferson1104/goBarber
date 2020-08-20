import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';


import Appointment from '../entities/Appointment';

//responsavel por criar, ler, deletar, editar os dados de appontiment

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  //Metodo que procura datas dos appointments
  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    });

    return findAppointment;
  }

  public async create({
    provider_id, date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;

/**
 * O REPOSITÓRIO É O QUE VAI TRABALHAR OS DADOS COMO:
 * LISTAR, CRIAR, DELETAR, EDITAR E ATUALIZAR
 */
