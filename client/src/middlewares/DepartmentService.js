/* eslint-disable consistent-return */
import Api from './Api';

export default {
  /**
   * Get list od department
   */
  async list() {
    try {
      const response = await Api('department', { method: 'GET' });
      return response;
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
