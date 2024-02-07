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
} from '../model/scoreboard';

export default class ScoreBoardService {
  constructor(
    private model = new ModMatches(),
    private teamModel = new TeamModel(),
  ) {}

  public async getScoreBoardService() {
    const Allteams = await this.teamModel.findAll();
    const AllMatches = await this.model.findAllMatches(undefined);
    const teamsThatScore = Allteams.map((team) => ({
      name: team.teamName,
      totalGames: totalGames(team.id, AllMatches),
      totalVictories:
      totalVictoryHome(team.id, AllMatches) + totalVictoriesAway(team.id, AllMatches),
      totalLosses: totalLosses(team.id, AllMatches),
      totalDraws: totalDraws(team.id, AllMatches),
      goalsFavor: goalsFavor(team.id, AllMatches),
      goalsOwn: goalsOwn(team.id, AllMatches),
      totalPoints: totalPoints(team.id, AllMatches),
    }));
    return { status: 'SUCCESSFUL', data: teamsThatScore };
  }
}
