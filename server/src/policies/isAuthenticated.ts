import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { formatErrorMessages } from '../utils';

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      res.status(401).send({
        error: 'authorization',
        messages: [
          ...formatErrorMessages([
            'You do not have access to this resource',
            'You are not authenticated'
          ])
        ]
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticate;
