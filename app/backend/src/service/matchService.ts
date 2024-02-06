import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModMatches from '../model/matchesMod';
import { Imatches } from '../Interfaces/Imatches';
import { MatchesInterface } from '../Interfaces/matchesInterface';
import TeamService from './teamService';
import { DataMatches } from '../Interfaces/typeMatches';

export default class ServiceMatch {
  constructor(
    private model: Imatches = new ModMatches(),
    private service = new TeamService(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<MatchesInterface[]>> {
    const matches = await this.model.findAllMatches(inProgress);
    return {
      status: 'SUCCESSFUL', data: matches };
  }

  public async matchesFinished(id: string, match: MatchesInterface) {
    await this.model.matchesFinish(id, match);
    return {
      status: 'SUCCESSFUL', message: 'Match updated' };
  }

  public async updatedMatchesService(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ) {
    await this.model.UpdatedMatches(homeTeamGoals, awayTeamGoals, id);
    return {
      status: 'SUCCESSFUL',
      data: 'Match updated',
    };
  }

  async createMatchesService(matchInfos: DataMatches): Promise<ServiceResponse<MatchesInterface>> {
    const { homeTeamId, awayTeamId } = matchInfos;

    const team1 = await this.service.getTeamByIdService(homeTeamId);
    const team2 = await this.service.getTeamByIdService(awayTeamId);

    if (team1.status === 'NOT_FOUND' || team2.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const nomeNovo = await this.model.createMatches(matchInfos);

    return { status: 'CREATED', data: nomeNovo };
  }
}
