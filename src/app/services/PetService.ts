import type { IPet, IPetResponse } from '../interfaces/IPet';
import TutorRepository from '../repositories/TutorRepository';
import PetRepository from '../repositories/PetRepository';
import NotFoundError from '../errors/NotFoundError';
import { isValidObjectId } from 'mongoose';

class PetService {
  async update(
    petId: string,
    tutorId: string,
    payload: IPet
  ): Promise<IPetResponse> {
    if (!isValidObjectId(tutorId) || !isValidObjectId(petId))
      throw new NotFoundError('Id not valid');

    const query = { _id: tutorId, pets: petId };
    const tutor = await TutorRepository.findTutorOfPet(query);
    if (tutor === null)
      throw new NotFoundError('Not found Tutor or Pet not Exist in Tutor');

    const result = await PetRepository.update(petId, payload);
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }

  async delete(petId: string, tutorId: string): Promise<IPetResponse | null> {
    if (!isValidObjectId(tutorId) || !isValidObjectId(petId))
      throw new NotFoundError('Id not valid');

    const queryFindTutorOfPet = { _id: tutorId, pets: petId };
    const tutorFindTutorOfPet = await TutorRepository.findTutorOfPet(
      queryFindTutorOfPet
    );
    if (tutorFindTutorOfPet === null)
      throw new NotFoundError('Not found Tutor or Pet not Exist in Tutor');

    const queryDeletePet = { $pull: { pets: petId } };
    const tutorDeletePet = await TutorRepository.deletePet(
      tutorId,
      queryDeletePet
    );
    if (tutorDeletePet === null) throw new NotFoundError('Not found Tutor');

    const result = await PetRepository.delete(petId);
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }

  async post(payload: IPet, tutorId: string): Promise<IPetResponse> {
    if (!isValidObjectId(tutorId)) throw new NotFoundError('Id not valid');

    const tutor = await TutorRepository.findTutorById(tutorId);
    if (tutor === null) throw new NotFoundError('Tutor not found');

    const result = await PetRepository.post(payload);

    const query = { $push: { pets: [result._id] } };
    await TutorRepository.updatePet(tutorId, query);

    return result;
  }
}

export default new PetService();
