import Api from './Api';

export default {
  /**
   * list of written reviews from logged in user
   */
  async mine() {
    try {
      const response = await Api('reviews', { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * list of all reviews
   */
  async list() {
    try {
      const response = await Api('reviews/list', { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },

  /**
   * Get all reviews made for an employee
   * @param {number} revieweeId the employee Id
   */
  async view(revieweeId) {
    try {
      const response = await Api(`reviews/employee/${revieweeId}`, { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
