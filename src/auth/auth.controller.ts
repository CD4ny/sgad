import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {
  }

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
}