/* eslint-disable consistent-return */
import Api from './Api';

export default {
  /**
   * Get list employee list
   */
  async employee() {
    try {
      const response = await Api('employee', { method: 'GET' });

      if (!response.success) {
        return response;
      }
      return {
        ...response,
      };
    } catch (errors) {
      return {
        errors,
        messages: [],
      };
    }
  },
};
