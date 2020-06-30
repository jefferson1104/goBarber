import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

//responsavel por criar, ler, deletar, editar os dados de appontiment
@EntityRepository(Appointment)
class AppointmentsRepository  extends Repository<Appointment> {
  //Metodo que procura datas dos appointments
  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date }
    });

    return findAppointment || null;
  }

}

export default AppointmentsRepository;

/**
 * O REPOSITÓRIO É O QUE VAI TRABALHAR OS DADOS COMO:
 * LISTAR, CRIAR, DELETAR, EDITAR E ATUALIZAR
 */
