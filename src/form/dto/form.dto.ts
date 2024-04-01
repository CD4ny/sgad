import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CreateFieldDto } from './field.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class CreateFormDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Prop({ default: () => new Date() })
  createdAt: Date;

  @ApiProperty({
    example: [
      {
        name: 'Peso',
        type: 'number',
        required: true,
        desc: 'kg',
        optimalValue: '0',
        options: [],
        id: '660a418ca5895fcf563e5278',
      },
      {
        name: 'Altura',
        type: 'number',
        required: true,
        desc: 'cm',
        optimalValue: '0',
        options: [],
        id: '660a418ca5895fcf563e5279',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[] | Types.ObjectId[];
}

export class UpdateFormDto extends PartialType(CreateFormDto, {
  // skipNullProperties: true,
}) {
  static createdAt: Date;
}
