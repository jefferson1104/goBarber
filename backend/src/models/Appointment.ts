import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;

/*
* ESSE MODEL É A REPRESENTAÇÃO DE:
* COMO UM DADO É COMPOSTO(QUAIS SÃO OS CAMPOSDELE)
* E COMO ELE É SALVO NA NOSSA APLICAÇÃO
*/
