/**
 * Display user name or email as fallback
 * @param {object} user the user objects
 * @return {string}
 */
const displayName = (user) => {
  if (!user) {
    return '';
  }
  if (!user.firstname && !user.lastname) {
    return user.email;
  }
  return `${user.firstname} ${user.lastname}`;
};

export default displayName;
