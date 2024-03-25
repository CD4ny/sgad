import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFieldDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsNumber()
  optimalValue?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  options?: string[];
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
