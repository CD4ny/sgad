"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("../user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user.schema");
describe('UserService', () => {
    let service;
    let userModel;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                user_service_1.UserService,
                {
                    provide: (0, mongoose_1.getModelToken)(user_schema_1.User.name),
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
        service = module.get(user_service_1.UserService);
        userModel = module.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should find all users', async () => {
        const result = [userModel({ identification: '123', email: 'test@example.com' })];
        userModel.find.mockResolvedValue(result);
        expect(await service.findAll()).toBe(result);
    });
    it('should validate user', async () => {
        const user = new userModel({ identification: '123', email: 'test@example.com' });
        userModel.exists.mockResolvedValue(false);
        await expect(service.validateUser(user)).resolves.not.toThrow();
    });
    it('should throw BadRequestException when user validation fails', async () => {
        const user = new userModel({ identification: '123', email: 'test@example.com' });
        userModel.exists.mockResolvedValue(true);
        await expect(service.validateUser(user)).rejects.toThrow();
    });
});
//# sourceMappingURL=user.service.spec.js.map