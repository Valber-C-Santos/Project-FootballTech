import { Request, Response, NextFunction } from 'express';

export default class ValidionTeam {
  public static async checkTeamExistence(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }
}
