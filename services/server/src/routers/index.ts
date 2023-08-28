import { Router } from 'express';
import authRouter from './authRouter';
import usersRouter from './userRouter';

const apiRouter = Router();

apiRouter.use('/api/auth', authRouter);
apiRouter.use('/api/users', usersRouter);

export default apiRouter;
