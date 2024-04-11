const isAdmin = (req, res, next) => {
  if (req.userId && req.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden - Admin access required" });
};

module.exports = {
  isAdmin,
};
