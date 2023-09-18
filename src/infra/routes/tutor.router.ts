/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../../app/controllers/TutorController';
import GetValidation from '../../app/middlewares/validations/TutorGetValidate';
import AuthVerify from '../../app/middlewares/AuthVerify';
import PushValidation from '../../app/middlewares/validations/TutorPushValidate';
import PutValidation from '../../app/middlewares/validations/TutorPutValidate';
import PatchValidation from '../../app/middlewares/validations/TutorPatchValidate';

const router = Router();

router.post('/tutor', PushValidation, TutorController.push);
router.get('/tutors', AuthVerify, GetValidation, TutorController.get);
router.put('/tutor/:id', AuthVerify, PutValidation, TutorController.update);
router.patch('/tutor/:id', AuthVerify, PatchValidation, TutorController.update);
router.delete('/tutor/:id', AuthVerify, TutorController.delete);

export default router;
