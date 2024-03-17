import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
            exists: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Aquí puedes agregar pruebas específicas para cada método del servicio
  // Por ejemplo, para probar el método findAll:
  it('should find all users', async () => {
    const result: User[] = [userModel({ identification: '123', email: 'test@example.com' })]; // Aquí puedes definir un resultado de prueba
    userModel.find.mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  // Prueba para el método validateUser
  it('should validate user', async () => {
    const user = new userModel({ identification: '123', email: 'test@example.com' });
    userModel.exists.mockResolvedValue(false); // Simula que no existen datos conflictivos

    await expect(service.validateUser(user)).resolves.not.toThrow();
  });

  it('should throw BadRequestException when user validation fails', async () => {
    const user = new userModel({ identification: '123', email: 'test@example.com' });
    userModel.exists.mockResolvedValue(true); // Simula que existen datos conflictivos

    await expect(service.validateUser(user)).rejects.toThrow();
  });
});