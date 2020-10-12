import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { formatErrorMessages } from '../utils';

class EmployeeControllerPolicy {
  public schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(
      new RegExp('^[a-zA-Z0-9]{8,32}$')
    ).required(),
    firstname: Joi.string().allow(''),
    lastname: Joi.string().allow(''),
    admin: Joi.boolean().optional(),
    departmentId: Joi.number().allow(null).optional()
  })

  /**
   * Register Policy
   * @param req {Request}
   * @param res {Response}
   * @param next {NextFunction}
   */
  public create(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'validation',
            messages: [
              ...formatErrorMessages([error.details[0].message], 'email')
            ]
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'validation',
            messages: [
              ...formatErrorMessages([
                'Your password has failed',
                'It must contain lowercase, uppercase, numbers.',
                'It must be at least 8 characters long'
              ], 'password')
            ]
          });
          break;
        default:
          res.status(400).send({
            error: 'validation',
            messages: [
              ...formatErrorMessages([error.details[0].message], error.details[0].context.key)
            ]
          });
          break;
      }
    } else {
      next();
    }
  }
}

export default new EmployeeControllerPolicy();
