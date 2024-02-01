import { UserInterface } from '../Interfaces/userInterface';
import User from '../database/models/userModel';
import { Iuser } from '../Interfaces/Iuser';

export default class UserModel implements Iuser {
  private model = User;

  async findAll(): Promise<UserInterface[]> {
    const allUsers = await this.model.findAll();
    return allUsers;
  }

  async findOne(email: string): Promise<UserInterface | null> {
    const userEmail = await this.model.findOne({ where: { email } });
    if (!userEmail) return null;
    return userEmail;
  }
}
