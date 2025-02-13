import { DataMatches } from '../Interfaces/typeMatches';
import { MatchesInterface } from '../Interfaces/matchesInterface';
import { Imatches } from '../Interfaces/Imatches';
import Matches from '../database/models/matchesModel';
import Teams from '../database/models/teamsModel';

export default class ModMatches implements Imatches {
  private model = Matches;

  async findAllMatches(inProgress?:boolean): Promise<MatchesInterface[]> {
    const allMatches = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress !== undefined) {
      return allMatches.filter((match) => match.inProgress === inProgress);
    }
    return allMatches;
  }

  async findMatchesFilter(query: string): Promise<MatchesInterface[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: query === 'true',
      },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    return matches;
  }

  async matchesFinish(id: string, match: MatchesInterface): Promise<MatchesInterface> {
    const newMatchUpdate = await this.model.findByPk(id);
    if (!newMatchUpdate) {
      throw new Error('Match not found');
    }
    await newMatchUpdate.update({ id: match.id, inProgress: false });
    return newMatchUpdate;
  }

  async UpdatedMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<MatchesInterface> {
    const matchUpdate = await this.model.findByPk(id);
    if (!matchUpdate) {
      throw new Error('Match not found');
    }
    await matchUpdate.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return matchUpdate;
  }

  async createMatches(match: DataMatches): Promise<MatchesInterface> {
    const { homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId } = match;
    const createNewMatch = await this.model.create({ homeTeamId,
      awayTeamId,
      awayTeamGoals,
      homeTeamGoals,
      inProgress: true });
    return createNewMatch;
  }
}
