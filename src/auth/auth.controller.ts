import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/SignInDto';
import { SignUpDto } from './dto/SignUpDto';


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
  @Post('signup')
  signUp(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Registrar' })
  @ApiBody({})
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}