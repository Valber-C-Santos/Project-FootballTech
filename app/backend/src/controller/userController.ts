import { Request, Response } from 'express';
import mapStatusHTTP from '../ultis/mapStatusHTTP';
import UserService from '../service/userService';

export default class UserController {
  constructor(private NewService: UserService = new UserService()) {}

  async loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await this.NewService.loginService(email, password);
    res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  static async logoutController(_req: Request, res: Response) {
    const { role } = res.locals.auth;
    res.status(200).json({ role });
  }
}
