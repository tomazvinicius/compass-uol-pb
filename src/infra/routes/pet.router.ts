/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import PetController from '../../app/controllers/PetController';
import petPutValidation from '../../app/middlewares/validations/PetPutValidate';
import petPatchValidation from '../../app/middlewares/validations/PetPatchValidate';
import AuthVerify from '../../app/middlewares/AuthVerify';
import petPostValidation from '../../app/middlewares/validations/PetPostValidate';

const router = Router();

router.post('/pet/:tutorId', petPostValidation, PetController.create);
router.put(
  '/pet/:petId/tutor/:tutorId',
  AuthVerify,
  petPutValidation,
  PetController.update
);
router.patch(
  '/pet/:petId/tutor/:tutorId',
  AuthVerify,
  petPatchValidation,
  PetController.update
);
router.delete('/pet/:petId/tutor/:tutorId', AuthVerify, PetController.delete);

export default router;
