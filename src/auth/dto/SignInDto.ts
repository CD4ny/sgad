import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'chavianodaniel99@gmail.com' })
  @IsString()
  readonly email: string;
  @ApiProperty({ example: 'string' })
  @IsString()
  readonly password: string;
}
