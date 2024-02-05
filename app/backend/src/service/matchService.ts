import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModMatches from '../model/matchesMod';
import { Imatches } from '../Interfaces/Imatches';
import { MatchesInterface } from '../Interfaces/matchesInterface';

export default class ServiceMatch {
  constructor(
    private model: Imatches = new ModMatches(),
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
}
