import { Request, Response } from 'express';
import db from '../models';

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
        }
      });
      const employeesJson = employees.map((user) => user.toJSON());
      res.send({
        success: true,
        data: employeesJson
      });
    } catch (err) {
      res.status(500).send({
        errors: ['employees'],
        messages: ['An error has occured trying to fetch the employees']
      });
    }
  }
}

export default EmployeeController;
