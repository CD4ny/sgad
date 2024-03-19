import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string, id: string, email: string, name: string, lastname: string }> {
    const user: UserDocument = await this.usersService.exists(username);
    console.log(user);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.identification, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
  }

  refreshToken(refreshToken: string) {
    return Promise.resolve(undefined);
  }
}