import { Request, Response } from 'express';
import db from '../models';
import { formatErrorMessages } from '../utils';

class EmployeeController {
  /**
   * List of employees
   * @param req {Request}
   * @param res {Response}
   */
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const employees = await db.User.findAll({
        where: {
          admin: false
        },
        attributes: {
          exclude: ['password']
        }
      });
      const employeesJson = employees.map((user) => user.toJSON());
      res.send({
        success: true,
        data: employeesJson
      });
    } catch (err) {
      res.status(500).send({
        error: 'internal error',
        messages: [
          ...formatErrorMessages(['An error has occured trying to fetch the employees'])
        ]
      });
    }
  }
}

export default EmployeeController;
