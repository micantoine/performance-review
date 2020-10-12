/**
 * FormatDate
 * @param {string} date The date as a string
 * @return {string}
 */
const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const lang = 'en-US';
  const now = new Date();
  const date = new Date(dateString);

  if (now.getDate() === date.getDate()) {
    const dateTimeFormat = new Intl.DateTimeFormat(lang, {
      hour: 'numeric',
      minute: 'numeric',
    });
    return `Today, ${dateTimeFormat.format(date)}`;
  }

  if (now.getFullYear() === date.getFullYear()) {
    const dateTimeFormat = new Intl.DateTimeFormat(lang, {
      month: 'long',
      day: 'numeric',
    });
    return `${dateTimeFormat.format(date)}`;
  }

  const dateTimeFormat = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return dateTimeFormat.format(date);
};

export default formatDate;
