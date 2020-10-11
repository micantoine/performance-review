import { Request, Response } from 'express';
import db from '../models';
import { formatErrorMessages } from '../utils';

class DepartmentController {
  /**
   * List of Department
   * @param req {Request}
   * @param res {Response}
   */
  static async index(req: Request, res: Response): Promise<void> {
    try {
      const department = await db.Department.findAll({
        attributes: ['id', 'name']
      });
      res.send({
        success: true,
        data: department
      });
    } catch (err) {
      res.status(500).send({
        errors: 'internal error',
        message: [
          ...formatErrorMessages(['An error has occured trying to fetch the employees'])
        ]
      });
    }
  }
}

export default DepartmentController;
