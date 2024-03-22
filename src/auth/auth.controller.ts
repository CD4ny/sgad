import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/SignInDto';
import { SignUpDto } from './dto/SignUpDto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticar' })
  @ApiBody({ type: SignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Registrar' })
  @ApiBody({ type: SignUpDto })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: SignInDto) {
    return this.authService.signUp(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Registrar' })
  @ApiBody({})
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('info-user')
  async isUserLogged(@Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    return this.authService.isUserLogged(token);
  }

  @ApiOperation({ summary: 'Registrar' })
  @ApiBody({})
  @HttpCode(HttpStatus.OK)
  @Post('validar')
  async checkActivationCode() {
    return this.authService.checkActivationCode();
  }
}
