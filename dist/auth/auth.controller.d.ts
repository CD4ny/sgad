import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignInDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        id: string;
        email: string;
        name: string;
        lastname: string;
    }>;
    signUp(signInDto: SignInDto): Promise<{
        accessToken: string;
        id: string;
        email: string;
        name: string;
        lastname: string;
    }>;
    refresh(refreshToken: string): Promise<any>;
}
