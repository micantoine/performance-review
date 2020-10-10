import { Request, Response, NextFunction } from 'express';
import { formatErrorMessages } from '../utils';

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).send({
      error: 'authorization',
      messages: [
        ...formatErrorMessages(['You are not authenticated'])
      ]
    });
  }
  if (!req.user.admin) {
    res.status(403).send({
      error: 'restriction',
      messages: [
        ...formatErrorMessages(['you do not have permission'])
      ]
    });
  }
  next();
};

export default isAdmin;
