import { Router } from 'express';
import { login, me, register } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/user', authMiddleware, me);

export default authRouter;