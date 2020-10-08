import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class AuthenticationControllerPolicy {
  public schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    // password: Joi.string().regex(
    //   new RegExp('^[a-zA-Z0-9]{8,32}$')
    // )
  })

  /**
   * Register Policy
   * @param req {Request}
   * @param res {Response}
   * @param next {NextFunction}
   */
  public register(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'validation',
            message: error.details[0].message
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'validation',
            message: [
              'Your password has failed',
              'It must contain lowercase, uppercase, numbers.',
              'It must be at least 8 characters long'
            ]
          });
          break;
        default:
          res.status(400).send({
            error: 'validation',
            message: ['Invalid registration confirmation']
          });
          break;
      }
    } else {
      next();
    }
  }
}

export default new AuthenticationControllerPolicy();
