import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ validateBeforeSave: true })
export class Measurement {
  @ApiProperty()
  @IsString()
  @Prop()
  value: number;

  @ApiProperty()
  @IsDate()
  @Prop()
  date: Date;

  @ApiProperty()
  @Prop()
  forms: Types.ObjectId[];
}

export type MeasurementDocument = HydratedDocument<Measurement> & Document;
export const MeasurementSchema = SchemaFactory.createForClass(Measurement);
