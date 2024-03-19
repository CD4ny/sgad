import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<{
        accessToken: string;
        id: string;
        email: string;
        name: string;
        lastname: string;
    }>;
    refreshToken(refreshToken: string): Promise<any>;
}
