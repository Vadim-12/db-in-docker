import { Router } from 'express';
import authController from '../controllers/authController';
import { body } from 'express-validator';

const authRouter = Router();

authRouter.post(
	'/registration',
	body('password').isLength({ min: 4, max: 30 }),
	authController.registration
);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export default authRouter;
