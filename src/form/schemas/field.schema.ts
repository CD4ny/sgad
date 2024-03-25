import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Field {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  required: boolean;

  @Prop()
  desc?: string;

  @Prop()
  optimalValue?: number;

  @Prop([String])
  options?: string[];
}

export type FieldDocument = Field & Document;
export const FieldSchema = SchemaFactory.createForClass(Field);
