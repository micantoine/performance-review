import { Request, Response } from 'express';
import db from '../models';

class ReviewController {
  /**
   * List of reviews
   * @param req {Request}
   * @param res {Response}
   */
  static async index(req: Request, res: Response): Promise<void> {
    try {
      let where = {};

      if (req.user) {
        where = {
          reviewerId: req.user.id
        };
      }

      const reviews = await db.Review.findAll({
        where,
        include: [
          {
            model: db.User,
            as: 'reviewee',
            attributes: ['firstname', 'lastname', 'id']
          }
        ]
      });
      const employeesJson = reviews.map((review) => review.toJSON());
      res.send(employeesJson);
    } catch (err) {
      res.status(500).send({
        error: 'reviews',
        message: ['An error has occured trying to fetch the employees']
      });
    }
  }

  /**
   * List of reviews
   * @param req {Request}
   * @param res {Response}
   */
  static async view(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await db.Review.findAll({
        where: {
          revieweeId: req.params.revieweeId
        },
        include: [
          {
            model: db.User,
            as: 'reviewee',
            attributes: ['firstname', 'lastname']
          },
          {
            model: db.User,
            as: 'reviewer',
            attributes: ['firstname', 'lastname', 'id']
          }
        ]
      });
      res.send(reviews);
    } catch (err) {
      res.status(500).send({
        error: 'reviews',
        message: ['An error has occured trying to fetch the reviews']
      });
    }
  }
}

export default ReviewController;
