import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';


@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'tuSecreto',
            signOptions: {expiresIn: '60m'},
        }),],
    providers: [AuthService],
})
export class AuthModule {
}
