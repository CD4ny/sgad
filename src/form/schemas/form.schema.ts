import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { IsDate, IsString } from 'class-validator';
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
  @IsDate()
  @Prop({ default: () => new Date() })
  createdAt: Date;

  @ApiProperty()
  @Prop()
  fields: Types.ObjectId[];
}

export type FormDocument = HydratedDocument<Form> & Document;
export const FormSchema = SchemaFactory.createForClass(Form);
