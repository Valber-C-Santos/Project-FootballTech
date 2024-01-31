import Teams from '../database/models/teamsModel';
import ITeamModel from '../Interfaces/Iteams';

export default class TeamModel implements ITeamModel {
  private model = Teams;

  async findAll(): Promise<Teams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findByPk(id: number): Promise<Teams | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData;
  }
}
