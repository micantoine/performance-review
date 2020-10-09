import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(403).send({
      error: 'authentication',
      message: ['You are not authenticated']
    });
  }
  if (!req.user.admin) {
    res.status(403).send({
      error: 'admin',
      message: ['you do not have permission']
    });
  }
  next();
};

export default isAdmin;
