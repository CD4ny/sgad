import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  validateBeforeSave: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
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
  @Prop({ default: '000000000000', unique: false })
  lastname: string;

  @ApiProperty()
  @IsBoolean()
  @Prop({ required: true, default: false })
  active: boolean;

  @ApiProperty()
  @IsBoolean()
  @Prop({ required: true, default: false })
  confirmed: boolean;

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
