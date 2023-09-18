import type { PaginateModel } from 'mongoose';
import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import uniqueValidator from 'mongoose-unique-validator';

import type { ITutor } from '../interfaces/ITutor';
import './PetSchema';

const schema = new Schema<ITutor>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    date_of_birth: { type: Date, required: true },
    zip_code: { type: String, required: true },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pets',
      },
    ],
  },
  { versionKey: false }
);

schema.plugin(paginate);
schema.plugin(uniqueValidator);

const Tutor = model<ITutor, PaginateModel<ITutor>>('Tutor', schema, 'Tutors');
export default Tutor;
