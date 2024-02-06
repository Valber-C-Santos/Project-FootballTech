import { Request, Response } from 'express';
import ScoreBoardService from '../service/scoreboard';

export default class ScoreBoardController {
  constructor(private service = new ScoreBoardService()) {}

  public async getScoreBoardController(req: Request, res: Response) {
    const { data } = await this.service.getScoreBoardService();
    return res.status(200).json(data);
  }
}
