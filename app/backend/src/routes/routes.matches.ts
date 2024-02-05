import { Router, Request, Response } from 'express';
import MatchController from '../controller/matchesController';
import authorizationToken from '../middlewares/authorizationMid';

const routerInstance = Router();

const matchController = new MatchController();

routerInstance.get('/', (req: Request, res: Response) => matchController.takeAllMatches(req, res));

routerInstance.patch(
  '/:id/finish',
  authorizationToken.verifyToken,
  (req: Request, res: Response) => matchController.finishMatches(req, res),
);

routerInstance.patch(
  '/:id',
  authorizationToken.verifyToken,
  (req: Request, res: Response) => matchController.updatedMatchesControll(req, res),
);

export default routerInstance;
