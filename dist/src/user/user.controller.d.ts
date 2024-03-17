import { UserService } from './user.service';
import { User } from './user.schema';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    remove(id: number): Promise<User>;
}
