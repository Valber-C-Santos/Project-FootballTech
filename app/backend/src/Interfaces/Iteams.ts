import TeamsInterface from './teams';

export default interface ITeamModel {
  findAll(): Promise<TeamsInterface[]>,
  findByPk(id: number): Promise<TeamsInterface | null>,
}
