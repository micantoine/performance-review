import { Request, Response } from 'express';
import db from '../models';
import UserModel from '../models/User';
import { formatErrorMessages } from '../utils';

class ReviewController {
  protected userAttributes = ['firstname', 'lastname', 'email', 'id'];

  /**
   * List of reviews from loggedin user
   * @param req {Request}
   * @param res {Response}
   */
  public async index(req: Request, res: Response): Promise<void> {
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
            attributes: this.userAttributes,
            include: [
              {
                model: db.Department,
                as: 'department',
                attributes: ['name']
              }
            ]
          }
        ]
      });
      const reviewsJson = reviews.map((review) => review.toJSON());
      res.send({
        success: true,
        data: reviewsJson
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

  /**
   * List of all reviews
   * @param req {Request}
   * @param res {Response}
   */
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await db.Review.findAll({
        attributes: {
          exclude: ['reviewerId', 'revieweeId']
        },
        include: [
          {
            model: db.User,
            as: 'reviewer',
            attributes: this.userAttributes,
            include: [
              {
                model: db.Department,
                as: 'department',
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
            as: 'reviewee',
            attributes: this.userAttributes,
            include: [
              {
                model: db.Department,
                as: 'department',
                attributes: ['name']
              }
            ]
          }
        ]
      });
      const reviewsJson = reviews.map((review) => review.toJSON());
      res.send({
        success: true,
        data: reviewsJson
      });
    } catch (err) {
      res.status(500).send({
        errors: 'internal error',
        err,
        message: [
          ...formatErrorMessages(['An error has occured trying to fetch the employees'])
        ]
      });
    }
  }

  /**
   * List of reviews for a user
   * @param req {Request}
   * @param res {Response}
   */
  public async view(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await db.Review.findAll({
        where: {
          revieweeId: req.params.revieweeId
        },
        include: [
          {
            model: db.User,
            as: 'reviewee',
            attributes: this.userAttributes,
            include: [
              {
                model: db.Department,
                as: 'department',
                attributes: ['name']
              }
            ]
          },
          {
            model: db.User,
            as: 'reviewer',
            attributes: this.userAttributes,
            include: [
              {
                model: db.Department,
                as: 'department',
                attributes: ['name']
              }
            ]
          }
        ]
      });

      let reviewee: UserModel;
      reviews.forEach((review) => {
        if (!reviewee) {
          reviewee = review.reviewee;
        }
      });

      res.send({
        success: true,
        data: {
          user: reviewee,
          reviews
        }
      });
    } catch (err) {
      res.status(500).send({
        errors: 'internal error',
        messages: [
          ...formatErrorMessages(['An error has occured trying to fetch the reviews'])
        ]
      });
    }
  }
}

export default new ReviewController();
