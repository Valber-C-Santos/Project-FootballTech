import TeamModel from '../model/teamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsInterface from '../Interfaces/teams';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  public async getAllteamsService(): Promise<ServiceResponse<TeamsInterface[]>> {
    const allteams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allteams };
  }

  public async getTeamByIdService(id: number): Promise<ServiceResponse<TeamsInterface>> {
    const team = await this.teamModel.findByPk(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
