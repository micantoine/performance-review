import Api from './Api';

export default {
  /**
   * Identity
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
   * Get all reviews for an employee
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
