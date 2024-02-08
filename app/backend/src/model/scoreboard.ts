import { MatchesInterface, LeaderBoardInterface } from '../Interfaces/matchesInterface';

const totalGamesHome = (teamId: number, matches: MatchesInterface[]): number => {
  const allGames = matches.filter((match) => match.homeTeamId === teamId);
  return allGames.length;
};

const totalVictoriesAway = (teamId: number, matches: MatchesInterface[]): number => {
  const vitoryAway = matches
    .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals);
  return vitoryAway.length;
};

const totalVictoryHome = (teamId: number, matches: MatchesInterface[]): number => {
  const vitoryHome = matches
    .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals);
  return vitoryHome.length;
};

const totalLossesHome = (teamId: number, matches: MatchesInterface[]): number => {
  const allLossesHome = matches
    .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  return allLossesHome.length;
};

const totalLossesAway = (teamId: number, matches: MatchesInterface[]): number => {
  const allLossesAway = matches
    .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
  return allLossesAway.length;
};

const totalDrawsHome = (teamId: number, matches: MatchesInterface[]): number => {
  const allDrawhome = matches.filter((match) => match
    .homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals);
  return allDrawhome.length;
};

const totalPointsHome = (teamId: number, matches: MatchesInterface[]): number => {
  const AllWinsHome = totalVictoryHome(teamId, matches);
  const AllDraws = totalDrawsHome(teamId, matches);
  return (AllWinsHome * 3) + AllDraws;
};

const goalsFavor = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsFavorHome = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return goalsFavorHome;
};

const goalsOwn = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsOwnHome = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  return goalsOwnHome;
};

const goalsBalance = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsBalanceHome = goalsFavor(teamId, matches) - goalsOwn(teamId, matches);
  return goalsBalanceHome;
};

const efficiency = (teamId: number, matches: MatchesInterface[]): string => {
  const totalPoints = totalPointsHome(teamId, matches);
  const totalGames = totalGamesHome(teamId, matches);
  const totalEfficiency = (((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return totalEfficiency;
};

const standingsTeams = (team: LeaderBoardInterface[]): LeaderBoardInterface[] => {
  const standings = team.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    return 0;
  });
  return standings;
};

export {
  totalGamesHome,
  totalVictoryHome,
  totalVictoriesAway,
  totalLossesHome,
  totalLossesAway,
  totalDrawsHome,
  goalsOwn,
  goalsFavor,
  totalPointsHome,
  efficiency,
  goalsBalance,
  standingsTeams,
};
