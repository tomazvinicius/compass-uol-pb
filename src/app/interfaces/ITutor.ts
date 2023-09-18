import type { Types } from 'mongoose';

export interface ITutor {
  name: string;
  password: string | undefined;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  pets?: Types.ObjectId[];
}

export interface ITutorResponse {
  _id?: Types.ObjectId;
  name: string;
  password?: string;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  pets?: Types.ObjectId[];
}

export interface ITutorPasswordResponse {
  _id: Types.ObjectId;
  password: string;
}

export interface ITutorPaginate {
  docs: ITutorResponse[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page?: number | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
}
