const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const formatText = (text) => {
  if (!text) return "";
  return text.trim();
};

module.exports = {
  formatDate,
  formatText,
};