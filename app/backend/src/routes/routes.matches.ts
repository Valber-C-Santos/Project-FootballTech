import { Router, Request, Response } from 'express';
import MatchController from '../controller/matchesController';

const routerInstance = Router();

const matchController = new MatchController();

routerInstance.get('/', (req: Request, res: Response) => matchController.takeAllMatches(req, res));

export default routerInstance;
