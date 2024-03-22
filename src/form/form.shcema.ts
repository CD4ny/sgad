import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ validateBeforeSave: true })
export class Form {
  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @IsString()
  @Prop()
  desc: string;

  @ApiProperty()
  @Prop()
  fields: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<Form> & Document;
export const UserSchema = SchemaFactory.createForClass(Form);
