import { Router, Request, Response } from 'express';

import TeamController from '../controller/teamContoller';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get(
  '/',
  (req: Request, res: Response) => teamController.getAllteamsController(req, res),
);

teamRouter.get(
  '/:id',
  (req: Request, res: Response) => teamController.getTeamByIdController(req, res),
);

export default teamRouter;
