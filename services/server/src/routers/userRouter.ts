import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.get('/', authMiddleware, userController.getAll);

export default userRouter;
