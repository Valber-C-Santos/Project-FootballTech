import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class authorizationToken {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const bearer = token.split(' ')[1];

    try {
      const secret = process.env.JWT_SECRET as string;
      const verified = jwt.verify(bearer, secret);
      res.locals.auth = verified;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
