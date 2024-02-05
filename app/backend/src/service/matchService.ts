import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ModMatches from '../model/matchesMod';
import { Imatches } from '../Interfaces/Imatches';
import { MatchesInterface } from '../Interfaces/matchesInterface';

export default class ServiceMatch {
  constructor(
    private model: Imatches = new ModMatches(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<MatchesInterface[]>> {
    const matchs = await this.model.findAllMatches(inProgress);
    return {
      status: 'SUCCESSFUL', data: matchs };
  }
}
