import { Router } from 'express';
import teamRouter from './routes.team';
import loginRouter from './routes.user';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
