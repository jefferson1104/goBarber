import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';


interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    //checando se ja existe unm usuario com o mesmo email
    const checkUserExists = await this.usersRepository.findByEmail(email);

    //mensagem de erro caso ja existir um usuario com o mesmo email
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    //criando e salvando o usuario
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    //retorna o usuario criado
    return user;
  }
}

export default CreateUserService;
