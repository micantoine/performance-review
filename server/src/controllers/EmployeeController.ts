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
          exclude: ['password', 'departmentId']
        },
        include: [
          {
            model: db.Department,
            as: 'department',
            attributes: ['name']
          }
        ]
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

  /**
   * Create Employer Controller
   * @param req {Request}
   * @param res  {Response}
   * @return {Promise}
   */
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await db.User.create(req.body);
      res.send({
        success: true,
        data: {
          email: user.email,
          id: user.id,
          admin: user.admin
        }
      });
    } catch (err) {
      res.status(400).send({
        error: 'validation',
        messages: [
          ...formatErrorMessages(['This email account already exists.'], 'email')
        ]
      });
    }
  }
}

export default EmployeeController;
