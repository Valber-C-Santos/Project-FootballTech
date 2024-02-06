import { Router, Request, Response } from 'express';
import ScoreBoardController from '../controller/scoreBoardController';

const scoreBoardRouter = Router();
const scoreBoardController = new ScoreBoardController();

scoreBoardRouter.get(
  '/home',
  (req: Request, res: Response) => scoreBoardController.getScoreBoardController(req, res),
);

export default scoreBoardRouter;
