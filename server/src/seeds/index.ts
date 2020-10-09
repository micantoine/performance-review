/* eslint-disable import/extensions */
import db from '../models';
import users from './users.json';
import reviews from './reviews.json';

db.sequelize.sync({ force: true })
  .then(async () => {
    await Promise.all(users.map((user) => db.User.create(user)));
    await Promise.all(reviews.map((review) => db.Review.create(review)));
  });
