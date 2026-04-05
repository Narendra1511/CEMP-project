const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const validateEvent = (event) => {
  const { title, description, date } = event;
  return !!(title && description && date);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

module.exports = {
  validateEmail,
  validateEvent,
  validatePassword,
};