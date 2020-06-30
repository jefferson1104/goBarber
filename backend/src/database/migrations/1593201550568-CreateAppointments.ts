import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1593201550568 implements MigrationInterface {

    //metodo up, colocamos o que dee ser feito no banco de dados quando a migration for executada
    //como por exemplo alteraçoes ou criações de novas tabelas
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: false,
            },
          ],
        }),
      );
    }

    //metodo para desfazer tudo que foi feito no metodo up (deletar tabela)
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}

