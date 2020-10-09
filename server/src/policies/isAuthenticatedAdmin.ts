import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      res.status(403).send({
        error: 'token',
        message: ['you do not have access to this resource']
      });
    }
    if (!user.admin) {
      res.status(403).send({
        error: 'admin',
        message: ['you do not have permission']
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticate;
