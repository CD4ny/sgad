import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    const users = [{ id: 1, name: 'John Doe' }];
    userService.findAll.mockResolvedValue(users);

    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(users);
  });

  it('/user/:id (GET)', () => {
    const user = { id: 1, name: 'John Doe' };
    userService.findOne.mockResolvedValue(user);

    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect(user);
  });

  it('/user (POST)', () => {
    const newUser = { name: 'Jane Doe' };
    userService.create.mockResolvedValue(newUser);

    return request(app.getHttpServer())
      .post('/user')
      .send(newUser)
      .expect(201)
      .expect(newUser);
  });

  it('/user/:id (PUT)', () => {
    const updatedUser = { id: 1, name: 'Jane Doe' };
    userService.update.mockResolvedValue(updatedUser);

    return request(app.getHttpServer())
      .put('/user/1')
      .send(updatedUser)
      .expect(200)
      .expect(updatedUser);
  });

  it('/user/:id (DELETE)', () => {
    userService.remove.mockResolvedValue({ deleted: true });

    return request(app.getHttpServer())
      .delete('/user/1')
      .expect(200)
      .expect({ deleted: true });
  });

  afterEach(async () => {
    await app.close();
  });
});