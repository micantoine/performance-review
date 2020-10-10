/**
 * checkCredentials
 * @param {string} email
 * @param {string} password
 * @return {success: boolean, errors: array, messages: array}
 */

export default (email, password) => {
  const errors = [];
  const messages = [];
  if (!email) {
    errors.push('email');
    messages.push('Email is empty');
  }

  if (!password) {
    errors.push('password');
    messages.push('Password is empty');
  }

  return {
    success: !messages.length,
    errors,
    messages,
  };
};
