import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class AthleteInfoDto {
  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @Prop()
  lastName: string;

  @ApiProperty()
  @IsString()
  @Prop()
  country: string;

  @ApiProperty()
  @IsDate()
  @Prop({ default: () => new Date() })
  birthDate: Date;
}
