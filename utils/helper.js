const isAdmin = (user) => {
  return user && user.role === "admin";
};

const generateEventCode = (title) => {
  if (!title) return "EVENT-000";
  const cleaned = title.replace(/\s+/g, "").toUpperCase().slice(0, 5);
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${cleaned}-${randomNum}`;
};

module.exports = {
  isAdmin,
  generateEventCode,
};