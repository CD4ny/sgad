import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFieldDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsBoolean()
  required: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  optimalValue?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  options?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  id?: string;
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
