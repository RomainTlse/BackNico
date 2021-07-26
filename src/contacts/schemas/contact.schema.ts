import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop()
  lastname: string;

  @Prop()
  firstname: string;

  @Prop()
  adress: string;

  @Prop({ unique: true })
  mail: string;

  @Prop()
  tel: string;

  @Prop()
  visitcard: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
