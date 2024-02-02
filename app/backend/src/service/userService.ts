import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../model/usersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Iuser } from '../Interfaces/Iuser';

type jwtype = { token: string };

export default class UserService {
  constructor(
    private NewLogin: Iuser = new UserModel(),
  ) {}

  public async loginService(email: string, password: string): Promise<ServiceResponse<jwtype>> {
    const userLogin = await this.NewLogin.findOne(email);
    if (!userLogin) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const validPassword = await bcrypt.compare(password, userLogin.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign(
      { id: userLogin.id, role: userLogin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
