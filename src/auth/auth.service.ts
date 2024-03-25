import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/user.schema';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { jwtConstants } from './auth.constants';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

async function generateEmailConfirmPage(url: string) {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Email Confirmation</title>
            <style>
                body {
                    margin: 0;
                    padding: 30px 0;
                    font-family: Arial, sans-serif;
                    background-color: #e8ecee;
                }
    
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-top: 3px solid #1a82e2;
                    border-bottom: 3px solid #1a82e2;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
    
                .header {
                    text-align: center;
                }
    
                .logo {
                    width: 100px;
                    height: auto;
                }
    
                .content {
                    padding: 20px 0;
                    font-size: 16px;
                    line-height: 1.6;
                    text-align: center;
                }
                .button-container {
                    display: flex;
                    justify-content: center;
                }
    
                .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #1a82e2;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
    
                .button:hover {
                    background-color: #146cb9;
                }
    
                .footer {
                    text-align: center;
                    padding-top: 20px;
                    font-size: 14px;
                    color: #666666;
                }
    
                .footer a {
                    color: #666666;
                    text-decoration: underline;
                }
            </style>
        </head>
    
        <body>
            <div class="container">
                <div class="header">
                    <img
                        src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png"
                        alt="Logo"
                        class="logo"
                    />
                </div>
                <div class="content">
                    <h1 style="margin: 0">Confirma tu correo</h1>
                    <p>
                    Por favor, haz clic en el botón de abajo para confirmar tu dirección de correo electrónico.
                    </p>
                </div>
                <div class="button-container">
                    <a href="${url}" class="button">Confirmar correo</a>
                </div>
            </div>
        </body>
    </html>
    `;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private authGuard: AuthGuard,
  ) {}

  async signUp(email: string, pass: string): Promise<{ message: string }> {
    let user: UserDocument = await this.usersService.exists(email);

    if (user) {
      throw new HttpException('El usuario existe', HttpStatus.BAD_REQUEST);
    }

    const name = email.split('@')[0];

    user = await this.usersService.create({
      confirmToken: Date.now() + name,
      lastname: '',
      email: email,
      password: pass,
      name: name,
      confirmed: false,
      active: true,
    });

    const nodemailerOptions: SMTPTransport.Options = {
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port: Number.parseInt(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(nodemailerOptions);

    transporter
      .sendMail({
        from: {
          name: 'SGAD',
          address: process.env.MAIL_USER,
        },
        to: email,
        subject: 'Email de verificación',
        html: await generateEmailConfirmPage(
          process.env.HOST + `/auth/confirm-account/${user.confirmToken}`,
        ),
      })
      .then();
    return {
      message:
        'Le hemos enviado un correo electrónico. Por favor, revise su bandeja de entrada y siga las instrucciones para confirmar su cuenta.',
    };
  }

  /*
   *   TODO: hacer unlogin
   * */
  async signOut(
    username: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    id: string;
    email: string;
    name: string;
    lastname: string;
  }> {
    const user: UserDocument = await this.usersService.exists(username);
    console.log(user);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    id: string;
    email: string;
    name: string;
    lastname: string;
  }> {
    const user: UserDocument = await this.usersService.exists(username);
    console.log(user);

    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    if (!user?.confirmed) {
      throw new HttpException('Cuenta sin confirmar', HttpStatus.FORBIDDEN);
    }

    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    console.log(jwtConstants.secret);
    const payload = { id: user.id, username: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
  }

  async isUserLogged(req: Request): Promise<{
    name: string;
    id: any;
    email: string;
    accessToken: string;
    lastname: string;
  }> {
    let token = this.authGuard.extractTokenFromHeader(req);
    console.log(token);
    let payload = this.jwtService.decode(token);
    console.log(payload, req, token);
    const id = payload.id;
    const user: UserDocument = await this.usersService.findOne(id);
    payload = { id: user?.id, email: user?.email };
    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
  }

  /*
   * TODO hacer logica de metodo de activacion de cuenta
   * */
  checkActivationCode() {
    return Promise.resolve(undefined);
  }
}
