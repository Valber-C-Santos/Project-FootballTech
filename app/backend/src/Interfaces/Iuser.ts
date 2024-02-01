import { UserInterface } from './userInterface';

export interface Iuser {
  findOne(email: string): Promise<UserInterface | null>,
}
