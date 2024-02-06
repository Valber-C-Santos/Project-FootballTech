import ModMatches from '../model/matchesMod';
import TeamModel from '../model/teamModel';
import { totalGames,
  totalVictoryHome,
  totalVictoriesAway,
  totalLosses,
  totalDraws,
  goalsOwn,
  goalsFavor,
  totalPoints,
} from '../Interfaces/scoreboard';

export default class ScoreBoardService {
  constructor(
    private model = new ModMatches(),
    private teamModel = new TeamModel(),
  ) {}

  public async getScoreBoardService() {
    const teams = await this.teamModel.findAll();
    const matches = await this.model.findAllMatches(undefined);
    const teamsWithScore = teams.map((team) => ({
      name: team.teamName,
      totalGames: totalGames(team.id, matches),
      totalVictories: totalVictoryHome(team.id, matches) + totalVictoriesAway(team.id, matches),
      totalLosses: totalLosses(team.id, matches),
      totalDraws: totalDraws(team.id, matches),
      goalsFavor: goalsFavor(team.id, matches),
      goalsOwn: goalsOwn(team.id, matches),
      totalPoints: totalPoints(team.id, matches),
    }));
    return { status: 'SUCCESSFUL', data: teamsWithScore };
  }
}
