import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FormDocument } from '../../form/schemas/form.schema';

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
  @IsString()
  @Prop()
  country: string;

  @ApiProperty()
  @IsDate()
  @Prop({ default: () => new Date() })
  birthDate: Date;

  @ApiProperty()
  @Prop()
  misc: FormDocument[];
}

export type AthleteDocument = HydratedDocument<Athlete> & Document;
export const AthleteSchema = SchemaFactory.createForClass(Athlete);
