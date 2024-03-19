import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}