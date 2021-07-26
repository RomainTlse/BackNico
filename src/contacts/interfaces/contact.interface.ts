import { Document } from 'mongoose';

export interface IContact extends Document {
  readonly lastname: string;
  readonly firstname: string;
  readonly adress: string;
  readonly mail: string;
  readonly tel: string;
  readonly visitcard: string;
}
