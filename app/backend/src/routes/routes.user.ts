import { Router, Request, Response } from 'express';
import UserController from '../controller/userController';
import ValidationLogin from '../middlewares/ValidationLogins';

const loginRouter = Router();

const userController = new UserController();

loginRouter.post(
  '/',
  ValidationLogin.loginIsValid,
  (req: Request, res: Response) => userController.loginController(req, res),
);

export default loginRouter;
