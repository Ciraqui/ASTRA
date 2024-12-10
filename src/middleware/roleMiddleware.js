const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      res.status(403).send('Unauthorized');
    }

    next();
  };
}

module.exports = checkRole;