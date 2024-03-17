import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignInDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
    }>;
}
