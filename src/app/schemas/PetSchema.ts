import type { PaginateModel } from 'mongoose';
import { Schema, model } from 'mongoose';

import type { IPet } from '../interfaces/IPet';

const schema = new Schema<IPet>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    species: { type: String, required: true },
    carry: { type: String, required: true },
    weight: { type: Number, required: true },
    date_of_birth: { type: Date, required: true },
  },
  { versionKey: false }
);

const Pet = model<IPet, PaginateModel<IPet>>('Pet', schema, 'Pets');
export default Pet;
