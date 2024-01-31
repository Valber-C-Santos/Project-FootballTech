import { Request, Response } from 'express';
import TeamService from '../service/teamService';
import mapStatusHTTP from '../ultis/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async getAllteamsController(req: Request, res: Response) {
    const allteams = await this.teamService.getAllteamsService();
    return res.status(mapStatusHTTP(allteams.status)).json(allteams.data);
  }

  async getTeamByIdController(req: Request, res: Response) {
    const { id } = req.params;
    const teamId = await this.teamService.getTeamByIdService(Number(id));
    return res.status(mapStatusHTTP(teamId.status)).json(teamId.data);
  }
}
