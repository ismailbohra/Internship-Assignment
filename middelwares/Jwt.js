const { jwtDecode } = require('./authorization');

const verifyToken = async (req, resp, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return resp.status(401).json({
        message: 'Unauthorized',
      });
    }
    const { id,role } = jwtDecode(token.replace('Bearer ', ''));
    if (!id && !role) {
      return resp.status(401).json({
        message: 'Unauthorized',
      });
    }
    req.userId = id;
    req.role = role;
    next();
  } catch (error) {
    return resp.status(401).json({
      message: 'Unauthorized',
    });
  }
};

module.exports = { verifyToken };
