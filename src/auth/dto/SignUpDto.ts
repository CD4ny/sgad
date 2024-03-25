import { ApiExtraModels, ApiHideProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class SignUpDto {
  @ApiHideProperty()
  readonly email: string;
  @ApiHideProperty()
  readonly password: string;
}
