import { Router, Request, Response } from 'express';
import UserController from '../controller/userController';
import ValidationLogin from '../middlewares/ValidationLogins';
import authorizationToken from '../middlewares/authorizationMid';

const loginRouter = Router();

const userController = new UserController();

loginRouter.post(
  '/',
  ValidationLogin.loginIsValid,
  (req: Request, res: Response) => userController.loginController(req, res),
);

loginRouter.get(
  '/role',
  authorizationToken.verifyToken,
  (req: Request, res: Response) => UserController.logoutController(req, res),
);

export default loginRouter;
