import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { IsDate, IsNumberString, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ validateBeforeSave: true })
export class Athlete {
  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @Prop()
  lastName: string;

  @ApiProperty()
  @IsNumberString()
  @Length(11, 11, { message: 'Your field must be exactly 11 digits long' })
  @Prop()
  ci: string;

  @ApiProperty()
  @IsString()
  @Prop()
  country: string;

  @ApiProperty()
  @IsDate()
  @Prop({ default: () => new Date() })
  birthDate: Date;

  @ApiProperty()
  @Prop()
  measurements: Types.ObjectId[];

  @ApiProperty()
  @Prop()
  forms: Types.ObjectId[];
}

export type AthleteDocument = HydratedDocument<Athlete> & Document;
export const AthleteSchema = SchemaFactory.createForClass(Athlete);
