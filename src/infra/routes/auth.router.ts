/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import AuthController from '../../app/controllers/AuthController';
import AuthValidation from '../../app/middlewares/validations/AuthValidate';

const router = Router();

router.post('/auth', AuthValidation, AuthController.create);

export default router;
