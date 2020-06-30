import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}


class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    //validando se o email existe, buscando um usuario com email
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: {email} });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //Validando a senha caso o usuario existir
    // user.password =  senha criptografada
    // password  = senha não-criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //Autenticação do usuario caso passar em todas as regras acima
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };

  }
}

export default AuthenticateUserService;
