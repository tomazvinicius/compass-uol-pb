import type { PaginateResult } from 'mongoose';
import type {
  ITutorPasswordResponse,
  ITutorResponse,
  ITutor,
} from '../interfaces/ITutor';
import TutorSchema from '../schemas/TutorSchema';

class TutorRepository {
  async get(
    page: number,
    limit: number
  ): Promise<PaginateResult<ITutorResponse>> {
    const options = {
      select: '-password',
      populate: { path: 'pets', model: 'Pet' },
    };
    const result = await TutorSchema.paginate({}, { page, limit, ...options });

    return result;
  }

  async findTutorOfPet(query: {
    _id: string;
    pets: string;
  }): Promise<ITutorResponse | null> {
    return await TutorSchema.findOne(query);
  }

  async delete(id: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndDelete(id);
  }

  async update(id: string, data: ITutor): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .select('-password -_id -pets')
      .exec();
  }

  async getByEmailToAuth(
    email: string
  ): Promise<ITutorPasswordResponse | null> {
    return await TutorSchema.findOne({ email }).select('password _id').lean();
  }

  async post(req: ITutor): Promise<ITutor> {
    return await TutorSchema.create(req);
  }

  async deletePet(
    tutorId: string,
    query: object
  ): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(tutorId, query);
  }

  async getPetsById(tutorId: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findById(tutorId).select('pets').lean();
  }

  async updatePet(
    tutorId: string,
    query: object
  ): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(tutorId, query)
      .select('_id')
      .lean();
  }

  async findTutorById(tutorId: string): Promise<ITutorResponse | null> {
    return await TutorSchema.findById(tutorId).select('_id').lean();
  }
}
export default new TutorRepository();
