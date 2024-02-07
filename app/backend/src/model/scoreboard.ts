import { MatchesInterface } from '../Interfaces/matchesInterface';

const totalGames = (teamId: number, matches: MatchesInterface[]): number => {
  const allGames = matches.filter(
    (match) => match.homeTeamId === teamId || match.awayTeamId === teamId,
  );
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

const totalLosses = (teamId: number, matches: MatchesInterface[]): number => {
  const allLossesHome = matches
    .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
  const AllLossesAway = matches
    .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
  const totalLossesGames = allLossesHome.length + AllLossesAway.length;
  return totalLossesGames;
};

const totalDraws = (teamId: number, matches: MatchesInterface[]): number => {
  const AllDraws = matches
    .filter((match) => (match.homeTeamId === teamId || match.awayTeamId === teamId)
      && match.homeTeamGoals === match.awayTeamGoals);
  return AllDraws.length;
};

const totalPoints = (teamId: number, matches: MatchesInterface[]): number => {
  const AllWins = totalVictoryHome(teamId, matches) + totalVictoriesAway(teamId, matches);
  const AllDraws = totalDraws(teamId, matches);
  return (AllWins * 3) + AllDraws;
};

const goalsFavor = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsFavorHome = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  const goalsFavorAway = matches
    .filter((match) => match.awayTeamId === teamId)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  return goalsFavorHome + goalsFavorAway;
};

const goalsOwn = (teamId: number, matches: MatchesInterface[]): number => {
  const goalsOwnHome = matches
    .filter((match) => match.homeTeamId === teamId)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const goalsOwnAway = matches
    .filter((match) => match.awayTeamId === teamId)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return goalsOwnHome + goalsOwnAway;
};

export {
  totalGames,
  totalVictoryHome,
  totalVictoriesAway,
  totalLosses,
  totalDraws,
  goalsOwn,
  goalsFavor,
  totalPoints,
};
