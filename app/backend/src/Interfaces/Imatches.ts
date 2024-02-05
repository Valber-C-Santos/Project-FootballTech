import { MatchesInterface } from './matchesInterface';

export interface Imatches{
  findAllMatches(inProgress?: boolean): Promise<MatchesInterface[]>
}
