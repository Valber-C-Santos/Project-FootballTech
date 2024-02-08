import ModMatches from '../model/matchesMod';
import TeamModel from '../model/teamModel';
import { totalGamesHome,
  totalVictoryHome,
  totalLossesHome,
  totalDrawsHome,
  goalsOwn,
  goalsFavor,
  totalPointsHome,
  efficiency,
  goalsBalance,
  standingsTeams,
} from '../model/scoreboard';

export default class ScoreBoardService {
  constructor(
    private model = new ModMatches(),
    private teamModel = new TeamModel(),
  ) {}

  public async getScoreBoardService() {
    const Allteams = await this.teamModel.findAll();
    const AllMatches = await this.model.findMatchesFilter('false');
    const teamsThatScore = Allteams.map((team) => ({
      name: team.teamName,
      totalPoints: totalPointsHome(team.id, AllMatches),
      totalGames: totalGamesHome(team.id, AllMatches),
      totalVictories: totalVictoryHome(team.id, AllMatches),
      totalDraws: totalDrawsHome(team.id, AllMatches),
      totalLosses: totalLossesHome(team.id, AllMatches),
      goalsFavor: goalsFavor(team.id, AllMatches),
      goalsOwn: goalsOwn(team.id, AllMatches),
      goalsBalance: goalsBalance(team.id, AllMatches),
      efficiency: efficiency(team.id, AllMatches),
    }));
    standingsTeams(teamsThatScore);
    return { status: 'SUCCESSFUL', data: teamsThatScore };
  }
}
