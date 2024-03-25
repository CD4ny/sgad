import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { CreateFieldDto } from './field.dto';
import { ApiProperty } from '@nestjs/swagger';

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
  @ValidateNested({ each: true })
  @Type(() => CreateFieldDto)
  fields: CreateFieldDto[];
}

export class UpdateFormDto extends PartialType(CreateFormDto, {
  skipNullProperties: true,
}) {}
