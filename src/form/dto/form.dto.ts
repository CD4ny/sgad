import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CreateFieldDto } from './field.dto';

export class CreateFormDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}

export class UpdateFormDto extends PartialType(CreateFormDto) {}
