import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsNumberString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ validateBeforeSave: true })
export class User {
  @ApiProperty({ description: 'The name of the user' })
  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @IsString()
  @Prop({ default: '000000000000' })
  lastname: string;

  @ApiProperty()
  @IsNumberString()
  @Length(11, 11, { message: 'Your field must be exactly 11 digits long' })
  @Prop({ default: '000000000000' })
  identification: string;

  @ApiProperty()
  @IsBoolean()
  @Prop({ required: true, default: false })
  isActive: boolean;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @IsString()
  @Prop()
  confirmToken: string;
}

export type UserDocument = HydratedDocument<User> & Document;
export const UserSchema = SchemaFactory.createForClass(User);
