import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeProvider: FakeProvider;
let createUser: CreateUserService;

//teste para criar um usuario com um repositorio fake sem usar banco de dados
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProvider = new FakeProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user =  await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',

    });

    expect(user).toHaveProperty('id');
  });


  //teste para nao permitir criar um usuario o mesmo email
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
