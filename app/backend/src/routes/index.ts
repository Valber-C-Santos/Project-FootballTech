import { Router } from 'express';
import teamRouter from './routes.team';
import loginRouter from './routes.user';
import matchRoute from './routes.matches';
import scoreBoardRouter from './routes.scoreBoard';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRoute);
router.use('/leaderboard', scoreBoardRouter);

export default router;
