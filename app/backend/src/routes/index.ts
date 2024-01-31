import { Router } from 'express';
import teamRouter from './routes.team';

const router = Router();

router.use('/teams', teamRouter);

export default router;
