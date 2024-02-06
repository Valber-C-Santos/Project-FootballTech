import { Router, Request, Response } from 'express';
import MatchController from '../controller/matchesController';
import authorizationToken from '../middlewares/authorizationMid';
import ValidionTeam from '../middlewares/validationTeam';

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

routerInstance.post(
  '/',
  authorizationToken.verifyToken,
  ValidionTeam.checkTeamExistence,
  (req: Request, res: Response) => matchController.createMatchesControll(req, res),
);

export default routerInstance;
