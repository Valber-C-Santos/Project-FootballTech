import { MatchesInterface } from '../Interfaces/matchesInterface';
import { Imatches } from '../Interfaces/Imatches';
import Matches from '../database/models/matchesModel';

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
}
