import { Request, Response } from 'express';
import mapStatusHTTP from '../ultis/mapStatusHTTP';
import ServiceMatch from '../service/matchService';

export default class MatchController {
  constructor(
    private service = new ServiceMatch(),
  ) {}

  public async takeAllMatches(req: Request, res: Response) {
    const onGoingMatches = req.query.inProgress;
    let onGoing: boolean | undefined;
    if (typeof onGoingMatches === 'string') { onGoing = onGoingMatches === 'true'; }
    const response = await this.service.getAllMatches(onGoing);
    return res.status(mapStatusHTTP(response.status)).json(response.data);
  }

  public async finishMatches(req: Request, res: Response) {
    const { id } = req.params;
    const match = req.body;
    const matches = await this.service.matchesFinished(id, match);
    res.status(200).json(matches);
  }
}
