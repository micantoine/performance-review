/* eslint-disable import/extensions */
import db from '../models';
import users from './users.json';
import reviews from './reviews.json';
import departments from './deparments.json';

db.sequelize.sync({ force: true })
  .then(async () => {
    await Promise.all(departments.map((department) => db.Department.create(department)));
    // make sure admin has Id 1 for seed purpose
    await db.User.create(users[0]);
    delete users[0];
    await Promise.all(users.map((user) => db.User.create(user)));
    await Promise.all(reviews.map((review) => db.Review.create(review)));
  });
