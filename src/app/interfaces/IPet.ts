import type { Types } from 'mongoose';

export interface IPet {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
}

export interface IPetResponse {
  _id?: Types.ObjectId;
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
}
