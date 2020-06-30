import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    //checando se ja existe unm usuario com o mesmo email
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    //mensagem de erro caso ja existir um usuario com o mesmo email
    if (checkUserExists) {
      throw new Error('Email address already userd.');
    }

    const hashedPassword = await hash(password, 8);

    //criando o usuario (criando a instancia mas nao cadastra no BD)
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    //salvando no BD
    await usersRepository.save(user);

    //retorna o usuario criado
    return user;
  }
}

export default CreateUserService;
