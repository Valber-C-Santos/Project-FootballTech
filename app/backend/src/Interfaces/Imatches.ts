import { DataMatches } from './typeMatches';
import { MatchesInterface } from './matchesInterface';

export interface Imatches{
  findAllMatches(inProgress?: boolean): Promise<MatchesInterface[]>
  matchesFinish(id: string, match: MatchesInterface): Promise<MatchesInterface>
  UpdatedMatches(homeTeamGoals: number, awayTeamGoals: number,
    id: string): Promise<MatchesInterface>,
  createMatches(match: DataMatches): Promise<MatchesInterface>
}
